import { NextResponse } from 'next/server';
import { callRingbookerDemo } from '@/lib/demo/ringbookerProxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SessionBody = {
  shopName?: string;
  businessType?: string;
  demoVertical?: string;
  demoSource?: string;
  demoMode?: string;
  captchaToken?: string;
  sessionId?: string;
  notes?: string;
  website?: string;
  demoConfig?: unknown;
};

export async function POST(request: Request) {
  let body: SessionBody;
  try {
    body = (await request.json()) as SessionBody;
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' }, { status: 400 });
  }

  const shopName = typeof body.shopName === 'string' ? body.shopName.trim() : '';
  const captchaToken = typeof body.captchaToken === 'string' ? body.captchaToken.trim() : '';
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';

  if (!shopName || shopName.length > 120) {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Anh/chị điền tên tiệm giúp nhé.' },
      { status: 400 },
    );
  }
  if (!captchaToken || !sessionId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Thiếu captcha hoặc session. Anh/chị thử lại giúp nhé.' },
      { status: 400 },
    );
  }

  // Honeypot — bots fill this; humans leave blank.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' }, { status: 400 });
  }

  const payload = {
    shopName,
    businessType: body.businessType || 'nail-salon',
    demoVertical: body.demoVertical || 'nail-salon',
    demoSource: body.demoSource || 'upmysalon_partner',
    demoMode: body.demoMode || 'quick',
    captchaToken,
    sessionId,
    notes: typeof body.notes === 'string' ? body.notes.slice(0, 500) : undefined,
    website: '',
    demoConfig: body.demoConfig,
  };

  try {
    const { status, body: upstream } = await callRingbookerDemo('', payload);
    if (status === 403) {
      console.error('[demo/session] RingBooker 403', {
        code: upstream.code,
        message: upstream.message,
      });
    }
    return NextResponse.json(upstream, { status });
  } catch (error) {
    const missing = error instanceof Error && error.message.startsWith('missing_env:');
    console.error('[demo/session]', error);
    return NextResponse.json(
      {
        ok: false,
        code: missing ? 'demo_not_configured' : 'realtime_session_failed',
        message: missing
          ? 'Demo chưa được cấu hình trên server. Anh/chị liên hệ UpMySalon giúp nhé.'
          : 'Chưa kết nối được demo lúc này. Anh/chị thử lại sau một lát nhé.',
      },
      { status: missing ? 503 : 502 },
    );
  }
}
