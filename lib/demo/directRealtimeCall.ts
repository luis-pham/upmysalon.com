const OPENAI_REALTIME_WEBRTC_URL = 'https://api.openai.com/v1/realtime/calls';
const CONNECT_TIMEOUT_MS = 45_000;
const MAX_SESSION_MS = 5 * 60 * 1000;
const GREETING_MIC_UNMUTE_FALLBACK_MS = 10_000;
const END_CALL_AUDIO_STOP_FALLBACK_MS = 6_000;
const END_CALL_AUDIO_STOP_HARD_FALLBACK_MS = 30_000;
const END_CALL_AUDIO_TAIL_GRACE_MS = 1_000;

export type DemoCallStage = 'idle' | 'connecting' | 'live' | 'ended' | 'failed';

export type DemoSessionPayload = {
  shopName: string;
  businessType: 'nail-salon';
  demoVertical: 'nail-salon';
  demoSource: 'upmysalon_partner';
  demoMode: 'quick';
  captchaToken: string;
  sessionId: string;
  website: '';
  notes?: string;
  demoConfig: {
    address?: string;
    city?: string;
    primaryHours?: string;
    secondaryHours?: string;
    staffNames?: string[];
    useDefaultFallbacks: boolean;
    services: Array<{
      category: string;
      name: string;
      price: number;
      duration?: string;
      enabled: boolean;
    }>;
  };
};

type SessionOk = {
  ok: true;
  clientSecret: string;
  requestId?: string;
  scriptedWelcomeLine?: string;
  turnDetectionAfterWelcome?: Record<string, unknown>;
};

type SessionFail = {
  ok?: false;
  code?: string;
  message?: string;
};

export type DirectRealtimeCallbacks = {
  onStage: (stage: DemoCallStage) => void;
  onStatus: (text: string) => void;
  onError: (message: string) => void;
};

export class DirectRealtimeDemoCall {
  private peer: RTCPeerConnection | null = null;
  private stream: MediaStream | null = null;
  private audio: HTMLAudioElement | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private requestId: string | null = null;
  private connectTimer: number | null = null;
  private maxDurationTimer: number | null = null;
  private endCallTailTimer: number | null = null;
  private mutedFailure = false;
  private durationStarted = false;

  constructor(private readonly cb: DirectRealtimeCallbacks) {}

  get activeRequestId() {
    return this.requestId;
  }

  async start(payload: DemoSessionPayload, preauthorizedStream?: MediaStream | null) {
    const previousId = this.requestId;
    this.cleanup({ release: true, endReason: 'completed', silent: true });
    this.mutedFailure = false;

    if (previousId) {
      await this.awaitRelease(previousId);
    }

    this.cb.onStage('connecting');
    this.cb.onStatus('Đang xin quyền micro…');

    const stream =
      preauthorizedStream ??
      (await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      }));
    this.stream = stream;

    this.cb.onStatus('Đang tạo phiên gọi thử…');
    const sessionRes = await fetch('/api/demo/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const sessionBody = (await sessionRes.json().catch(() => ({}))) as SessionOk | SessionFail;

    if (!sessionRes.ok || !('ok' in sessionBody) || !sessionBody.ok || !('clientSecret' in sessionBody) || !sessionBody.clientSecret) {
      this.cleanup({ release: false });
      this.cb.onStage('idle');
      this.cb.onStatus('');
      throw Object.assign(new Error('session_failed'), { status: sessionRes.status, body: sessionBody });
    }

    this.requestId = sessionBody.requestId ?? null;
    try {
      await this.connectWebRtc(sessionBody);
    } catch (error) {
      this.cleanup({ release: true, endReason: 'completed' });
      this.cb.onStage('failed');
      throw error;
    }
  }

  async end(endReason: 'completed' | 'timeout' = 'completed') {
    this.mutedFailure = true;
    this.cleanup({ release: true, endReason });
    this.cb.onStage('ended');
    this.cb.onStatus('Cuộc gọi thử đã kết thúc.');
  }

  dispose() {
    this.mutedFailure = true;
    this.cleanup({ release: true, endReason: 'completed', silent: true });
  }

  private async connectWebRtc(sessionBody: SessionOk) {
    this.cb.onStatus('Đang kết nối tổng đài…');
    const pc = new RTCPeerConnection();
    this.peer = pc;
    let connected = false;

    this.connectTimer = window.setTimeout(() => {
      if (connected) return;
      this.fail('Kết nối demo quá lâu. Anh/chị thử lại giúp nhé.');
    }, CONNECT_TIMEOUT_MS);

    const audio = new Audio();
    audio.autoplay = true;
    this.audio = audio;

    const markLive = () => {
      if (connected) return;
      connected = true;
      this.clearConnectTimer();
      this.beginMaxDuration();
      this.cb.onStage('live');
      this.cb.onStatus('Đã kết nối — tổng đài sẽ chào trước, rồi anh/chị nói chuyện được.');
    };

    pc.ontrack = (event) => {
      audio.srcObject = event.streams[0] ?? null;
      void audio.play().catch(() => undefined);
      markLive();
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') markLive();
      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        if (this.mutedFailure) return;
        this.fail('Không kết nối được demo. Anh/chị kiểm tra mạng rồi thử lại.');
      }
    };

    const micTracks: MediaStreamTrack[] = [];
    for (const track of this.stream!.getAudioTracks()) {
      track.enabled = false;
      micTracks.push(track);
      pc.addTrack(track, this.stream!);
    }

    let micFallback: number | null = window.setTimeout(() => {
      micFallback = null;
      for (const t of micTracks) {
        if (t.readyState === 'live') t.enabled = true;
      }
    }, GREETING_MIC_UNMUTE_FALLBACK_MS);

    const enableMic = () => {
      if (micFallback !== null) {
        window.clearTimeout(micFallback);
        micFallback = null;
      }
      for (const t of micTracks) {
        if (t.readyState === 'live') t.enabled = true;
      }
    };

    const dc = pc.createDataChannel('oai-events');
    this.dataChannel = dc;
    this.wireDataChannel(dc, sessionBody, enableMic);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    const sdpResponse = await fetch(OPENAI_REALTIME_WEBRTC_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionBody.clientSecret}`,
        'Content-Type': 'application/sdp',
      },
      body: offer.sdp,
    });
    if (!sdpResponse.ok) {
      throw new Error('webrtc_connect_failed');
    }
    await pc.setRemoteDescription({ type: 'answer', sdp: await sdpResponse.text() });
  }

  private wireDataChannel(
    dc: RTCDataChannel,
    sessionBody: SessionOk,
    enableMic: () => void,
  ) {
    let initialGreetingRequested = false;
    let realtimeSessionReady = false;
    let vadResumeAfterWelcomeSent = false;
    let awaitingInitialGreetingAudioStop = false;
    let toolsRegistered = false;
    let assistantAudioPlaying = false;
    let endCallPending = false;
    let endCallFallbackTimer: number | null = null;
    let endCallFallbackStartedAtMs: number | null = null;
    let latestResponseDone = false;
    let lastResponseCreatedAtMs: number | null = null;
    let lastOutputAudioBufferStoppedAtMs: number | null = null;

    const clearEndCallFallback = () => {
      if (endCallFallbackTimer !== null) {
        window.clearTimeout(endCallFallbackTimer);
        endCallFallbackTimer = null;
      }
      endCallFallbackStartedAtMs = null;
    };

    const completeEndCall = () => {
      if (!endCallPending) return;
      endCallPending = false;
      clearEndCallFallback();
      if (this.endCallTailTimer !== null) {
        window.clearTimeout(this.endCallTailTimer);
        this.endCallTailTimer = null;
      }
      void this.end('completed');
    };

    const armEndCallTailGrace = () => {
      if (this.endCallTailTimer !== null) return;
      this.endCallTailTimer = window.setTimeout(() => {
        this.endCallTailTimer = null;
        completeEndCall();
      }, END_CALL_AUDIO_TAIL_GRACE_MS);
    };

    const armEndCallCompletion = () => {
      if (endCallFallbackTimer !== null) return;
      const startedAt = endCallFallbackStartedAtMs ?? Date.now();
      endCallFallbackStartedAtMs = startedAt;
      endCallFallbackTimer = window.setTimeout(() => {
        endCallFallbackTimer = null;
        if (!endCallPending) {
          endCallFallbackStartedAtMs = null;
          return;
        }
        const elapsedMs = Date.now() - startedAt;
        if (assistantAudioPlaying && elapsedMs < END_CALL_AUDIO_STOP_HARD_FALLBACK_MS) {
          armEndCallCompletion();
          return;
        }
        completeEndCall();
      }, END_CALL_AUDIO_STOP_FALLBACK_MS);
    };

    const finalResponseAudioAlreadyStopped = () =>
      latestResponseDone &&
      lastResponseCreatedAtMs !== null &&
      lastOutputAudioBufferStoppedAtMs !== null &&
      lastOutputAudioBufferStoppedAtMs >= lastResponseCreatedAtMs;

    const registerDemoTools = () => {
      if (toolsRegistered || dc.readyState !== 'open') return;
      toolsRegistered = true;
      try {
        dc.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              type: 'realtime',
              tools: [
                {
                  type: 'function',
                  name: 'validate_appointment_time',
                  description:
                    'Validates whether a requested appointment date and time falls within business hours. ' +
                    'Call this whenever the caller provides a specific date and time for a booking before confirming it.',
                  parameters: {
                    type: 'object',
                    properties: {
                      date: { type: 'string', description: 'Appointment date in YYYY-MM-DD format.' },
                      time: { type: 'string', description: 'Appointment time in HH:MM 24-hour format.' },
                    },
                    required: ['date', 'time'],
                  },
                },
                {
                  type: 'function',
                  name: 'end_call',
                  description:
                    'End the browser demo session after the caller request is fully complete. ' +
                    'Say a brief warm goodbye before calling this tool.',
                  parameters: {
                    type: 'object',
                    properties: {
                      reason: {
                        type: 'string',
                        enum: [
                          'booking_completed',
                          'link_sent',
                          'question_answered',
                          'callback_scheduled',
                          'handoff_initiated',
                          'other',
                        ],
                      },
                    },
                    required: ['reason'],
                  },
                },
              ],
              tool_choice: 'auto',
            },
          }),
        );
      } catch {
        toolsRegistered = false;
      }
    };

    const maybeResumeVadAfterWelcome = () => {
      const td = sessionBody.turnDetectionAfterWelcome;
      if (!td || typeof td !== 'object' || Array.isArray(td) || vadResumeAfterWelcomeSent) return;
      if (dc.readyState !== 'open') return;
      if (td.create_response !== true) return;
      vadResumeAfterWelcomeSent = true;
      try {
        dc.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              type: 'realtime',
              audio: { input: { turn_detection: td } },
            },
          }),
        );
      } catch {
        vadResumeAfterWelcomeSent = false;
      }
    };

    const requestInitialGreeting = () => {
      if (initialGreetingRequested || !realtimeSessionReady || dc.readyState !== 'open') return;
      initialGreetingRequested = true;
      awaitingInitialGreetingAudioStop = true;
      this.cb.onStatus('Tổng đài đang chào anh/chị…');
      try {
        const scripted = sessionBody.scriptedWelcomeLine?.trim();
        const greetingInstructions = scripted
          ? `Speak first now. Say this opening line exactly once (natural contractions allowed), then stop and listen for the caller: ${scripted}`
          : 'Speak first now. Say only the exact WELCOME MESSAGE from RUNTIME BUSINESS CONFIG, naturally and once, then stop and listen.';
        dc.send(
          JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'message',
              role: 'user',
              content: [
                {
                  type: 'input_text',
                  text: 'The call just connected. Please say the configured WELCOME MESSAGE before I say anything.',
                },
              ],
            },
          }),
        );
        dc.send(
          JSON.stringify({
            type: 'response.create',
            response: { instructions: greetingInstructions },
          }),
        );
      } catch {
        initialGreetingRequested = false;
        awaitingInitialGreetingAudioStop = false;
      }
    };

    dc.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(String(event.data)) as {
          type?: string;
          call_id?: string;
          name?: string;
          arguments?: string;
          response?: { status?: string };
          error?: { message?: string };
        };

        if (data.type === 'output_audio_buffer.started') {
          assistantAudioPlaying = true;
          lastOutputAudioBufferStoppedAtMs = null;
        }
        if (data.type === 'session.created' || data.type === 'session.updated') {
          realtimeSessionReady = true;
          if (data.type === 'session.created') registerDemoTools();
          requestInitialGreeting();
        }
        if (data.type === 'response.created') {
          lastResponseCreatedAtMs = Date.now();
          lastOutputAudioBufferStoppedAtMs = null;
          latestResponseDone = false;
          if (!endCallPending) this.cb.onStatus('Tổng đài đang trả lời…');
        }
        if (data.type === 'response.done') {
          latestResponseDone = true;
          if (endCallPending && !assistantAudioPlaying && finalResponseAudioAlreadyStopped()) {
            armEndCallTailGrace();
          } else if (!awaitingInitialGreetingAudioStop && !endCallPending) {
            this.cb.onStatus('Đã kết nối — anh/chị nói chuyện tự nhiên được.');
          }
        }
        if (data.type === 'response.function_call_arguments.done' && data.name === 'validate_appointment_time') {
          const callId = data.call_id;
          const currentRequestId = this.requestId;
          void (async () => {
            let toolOutput: Record<string, unknown> = {
              ok: false,
              valid: false,
              reason: 'validation_unavailable',
            };
            try {
              const args = JSON.parse(data.arguments ?? '{}') as { date?: string; time?: string };
              if (currentRequestId && args.date && args.time) {
                const res = await fetch('/api/demo/session/validate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    requestId: currentRequestId,
                    demoVertical: 'nail-salon',
                    date: args.date,
                    time: args.time,
                  }),
                });
                const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
                toolOutput = json;
              }
            } catch {
              /* keep fallback */
            }
            if (dc.readyState === 'open' && callId) {
              dc.send(
                JSON.stringify({
                  type: 'conversation.item.create',
                  item: {
                    type: 'function_call_output',
                    call_id: callId,
                    output: JSON.stringify(toolOutput),
                  },
                }),
              );
              dc.send(JSON.stringify({ type: 'response.create' }));
            }
          })();
        }
        if (data.type === 'response.function_call_arguments.done' && data.name === 'end_call') {
          const callId = data.call_id;
          endCallPending = true;
          this.cb.onStatus('Đang kết thúc cuộc gọi thử…');
          armEndCallCompletion();
          if (!assistantAudioPlaying && finalResponseAudioAlreadyStopped()) armEndCallTailGrace();
          if (dc.readyState === 'open' && callId) {
            try {
              dc.send(
                JSON.stringify({
                  type: 'conversation.item.create',
                  item: {
                    type: 'function_call_output',
                    call_id: callId,
                    output: JSON.stringify({
                      ok: true,
                      message: 'Demo session will end after the goodbye audio finishes.',
                    }),
                  },
                }),
              );
            } catch {
              /* ignore */
            }
          }
        }
        if (awaitingInitialGreetingAudioStop && data.type === 'output_audio_buffer.stopped') {
          awaitingInitialGreetingAudioStop = false;
          enableMic();
          this.cb.onStatus('Đã kết nối — anh/chị nói chuyện tự nhiên được.');
          maybeResumeVadAfterWelcome();
        }
        if (data.type === 'output_audio_buffer.stopped') {
          assistantAudioPlaying = false;
          lastOutputAudioBufferStoppedAtMs = Date.now();
          if (endCallPending) armEndCallTailGrace();
        }
        if (data.type === 'input_audio_buffer.speech_started' && !endCallPending) {
          this.cb.onStatus('Đang nghe anh/chị…');
        }
      } catch {
        /* ignore non-json */
      }
    });
  }

  private beginMaxDuration() {
    if (this.durationStarted) return;
    this.durationStarted = true;
    this.maxDurationTimer = window.setTimeout(() => {
      this.mutedFailure = true;
      this.cleanup({ release: true, endReason: 'timeout' });
      this.cb.onStage('failed');
      this.cb.onStatus('Phiên gọi thử đã hết 5 phút. Anh/chị có thể bắt đầu lại sau một chút.');
      this.cb.onError('Phiên gọi thử đã hết 5 phút. Anh/chị có thể bắt đầu lại sau một chút.');
    }, MAX_SESSION_MS);
  }

  private fail(message: string) {
    this.mutedFailure = true;
    this.cleanup({ release: true, endReason: 'completed' });
    this.cb.onStage('failed');
    this.cb.onStatus(message);
    this.cb.onError(message);
  }

  private clearConnectTimer() {
    if (this.connectTimer !== null) {
      window.clearTimeout(this.connectTimer);
      this.connectTimer = null;
    }
  }

  private cleanup(opts: {
    release: boolean;
    endReason?: 'completed' | 'timeout';
    silent?: boolean;
  }) {
    this.clearConnectTimer();
    if (this.maxDurationTimer !== null) {
      window.clearTimeout(this.maxDurationTimer);
      this.maxDurationTimer = null;
    }
    if (this.endCallTailTimer !== null) {
      window.clearTimeout(this.endCallTailTimer);
      this.endCallTailTimer = null;
    }
    this.durationStarted = false;

    const releaseId = this.requestId;
    this.requestId = null;
    if (opts.release && releaseId) {
      void fetch('/api/demo/session/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: releaseId, endReason: opts.endReason ?? 'completed' }),
        keepalive: true,
      }).catch(() => undefined);
    }

    try {
      this.dataChannel?.close();
    } catch {
      /* ignore */
    }
    this.dataChannel = null;

    if (this.peer) {
      this.peer.ontrack = null;
      this.peer.onconnectionstatechange = null;
      this.peer.close();
    }
    this.peer = null;

    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;

    if (this.audio) {
      this.audio.pause();
      this.audio.srcObject = null;
      this.audio = null;
    }
  }

  private async awaitRelease(requestId: string) {
    try {
      await fetch('/api/demo/session/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, endReason: 'completed' }),
      });
    } catch {
      /* proceed */
    }
  }
}

export async function requestDemoMicrophone(): Promise<MediaStream> {
  if (!window.isSecureContext) {
    throw Object.assign(new Error('insecure_context'), { name: 'SecurityError' });
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    throw Object.assign(new Error('no_getUserMedia'), { name: 'NotSupportedError' });
  }
  return navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  });
}
