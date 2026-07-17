'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Phone, PhoneOff } from 'lucide-react';
import { TurnstileWidget } from '@/components/demo/TurnstileWidget';
import {
  DEFAULT_CITY_FALLBACK,
  DEFAULT_DEMO_CONFIG,
  DEFAULT_SHOP_NAME,
  cloneServiceCategories,
  flattenServiceCategories,
  parseCityFromAddress,
  type DemoServiceCategory,
} from '@/lib/demo/defaults';
import { isInAppBrowser } from '@/lib/demo/detectInAppBrowser';
import {
  DirectRealtimeDemoCall,
  requestDemoMicrophone,
  type DemoCallStage,
  type DemoSessionPayload,
} from '@/lib/demo/directRealtimeCall';
import { inAppBrowserHintVi, messageForDemoSessionError, microphoneErrorMessageVi } from '@/lib/demo/errors';
import './demo-form.css';
import './vd-phone.css';

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';

function newSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `ums-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function phoneSubtitle(stage: DemoCallStage): string {
  if (stage === 'connecting') return 'Đang kết nối…';
  if (stage === 'live') return 'Đang gọi';
  if (stage === 'ended') return 'Đã kết thúc';
  if (stage === 'failed') return 'Gọi thử lỗi';
  return 'Gọi thử trực tiếp';
}

export function DemoCallBlock() {
  const [shopName, setShopName] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [address, setAddress] = useState(DEFAULT_DEMO_CONFIG.address);
  const [primaryHours, setPrimaryHours] = useState(DEFAULT_DEMO_CONFIG.primaryHours);
  const [secondaryHours, setSecondaryHours] = useState(DEFAULT_DEMO_CONFIG.secondaryHours);
  const [staffText, setStaffText] = useState(DEFAULT_DEMO_CONFIG.staffNames.join(', '));
  const [serviceCategories, setServiceCategories] = useState<DemoServiceCategory[]>(() =>
    cloneServiceCategories(DEFAULT_DEMO_CONFIG.serviceCategories),
  );
  const [selectedCategory, setSelectedCategory] = useState(
    DEFAULT_DEMO_CONFIG.serviceCategories[0]?.id ?? 'manicure',
  );
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [stage, setStage] = useState<DemoCallStage>('idle');
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [inAppHint, setInAppHint] = useState<string | null>(null);

  const callRef = useRef<DirectRealtimeDemoCall | null>(null);
  const sessionIdRef = useRef(newSessionId());

  const displayName = shopName.trim() || DEFAULT_SHOP_NAME;
  const busy = stage === 'connecting' || stage === 'live';
  const activeCategory = serviceCategories.find((c) => c.id === selectedCategory) ?? serviceCategories[0];

  useEffect(() => {
    if (isInAppBrowser()) setInAppHint(inAppBrowserHintVi());
    return () => {
      callRef.current?.dispose();
      callRef.current = null;
    };
  }, []);

  const payload = useMemo((): DemoSessionPayload => {
    const staffNames = staffText
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 12);
    const trimmedAddress = address.trim();
    const inferredCity = trimmedAddress
      ? parseCityFromAddress(trimmedAddress)
      : expanded
        ? DEFAULT_CITY_FALLBACK
        : '';
    return {
      shopName: displayName,
      businessType: 'nail-salon',
      demoVertical: 'nail-salon',
      demoSource: 'upmysalon_partner',
      demoMode: 'quick',
      captchaToken: turnstileSiteKey ? captchaToken || '' : 'dev-turnstile-bypass',
      sessionId: sessionIdRef.current,
      website: '',
      demoConfig: {
        address: trimmedAddress || undefined,
        city: inferredCity || undefined,
        primaryHours: primaryHours.trim() || undefined,
        secondaryHours: secondaryHours.trim() || undefined,
        staffNames,
        useDefaultFallbacks: !expanded,
        services: flattenServiceCategories(serviceCategories),
      },
    };
  }, [
    address,
    displayName,
    expanded,
    primaryHours,
    secondaryHours,
    serviceCategories,
    staffText,
    captchaToken,
  ]);

  function updateService(
    categoryId: string,
    index: number,
    patch: Partial<{ enabled: boolean; price: number }>,
  ) {
    setServiceCategories((cats) =>
      cats.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
        };
      }),
    );
  }
  async function handleStart() {
    setError(null);
    if (isInAppBrowser()) {
      setInAppHint(inAppBrowserHintVi());
      setError(inAppBrowserHintVi());
      return;
    }
    if (!shopName.trim()) {
      setError('Anh/chị điền tên tiệm giúp nhé.');
      return;
    }
    if (turnstileSiteKey && !captchaToken) {
      setError('Anh/chị đợi xác minh captcha xong rồi bấm gọi thử.');
      return;
    }

    let mic: MediaStream | null = null;
    try {
      mic = await requestDemoMicrophone();
    } catch (err) {
      setError(microphoneErrorMessageVi(err));
      setStage('idle');
      return;
    }

    if (!callRef.current) {
      callRef.current = new DirectRealtimeDemoCall({
        onStage: setStage,
        onStatus: setStatusText,
        onError: (msg) => setError(msg),
      });
    }

    try {
      await callRef.current.start({ ...payload, captchaToken: payload.captchaToken }, mic);
      setTurnstileReset((n) => n + 1);
      setCaptchaToken(null);
    } catch (err) {
      mic.getTracks().forEach((t) => t.stop());
      if (err && typeof err === 'object' && 'status' in err && 'body' in err) {
        const status = Number((err as { status: number }).status);
        const body = (err as { body: Record<string, unknown> }).body;
        setError(messageForDemoSessionError(status, body));
      } else if (err instanceof Error && err.message === 'webrtc_connect_failed') {
        setError('Không kết nối được demo. Anh/chị kiểm tra mạng rồi thử lại.');
      } else {
        setError(microphoneErrorMessageVi(err));
      }
      setStage('failed');
      setTurnstileReset((n) => n + 1);
      setCaptchaToken(null);
    }
  }

  async function handleEnd() {
    await callRef.current?.end('completed');
    setTurnstileReset((n) => n + 1);
    setCaptchaToken(null);
  }

  return (
    <section className="py-16 sm:py-24" id="goi-thu-demo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-roseNude/15 bg-ink text-white shadow-soft">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            {/* Left: copy + form */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">
                Gọi thử miễn phí · 60 giây
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                Dùng thử lễ tân AI trả lời điện thoại cho tiệm nail
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/72">
                Điền tên tiệm, bấm gọi thử — AI chào khách và trả lời như lễ tân thật. Không cần số điện thoại.
              </p>

              <div className="mt-8 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-cream">Tên tiệm</span>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder={DEFAULT_SHOP_NAME}
                    disabled={busy}
                    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-base text-ink outline-none ring-blush/40 transition placeholder:text-ink/35 focus:ring-2 disabled:opacity-60"
                    maxLength={120}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blush transition hover:text-cream disabled:opacity-50"
                >
                  Tùy chỉnh giờ, thợ &amp; dịch vụ
                  <ChevronDown className={`h-4 w-4 transition ${expanded ? 'rotate-180' : ''}`} />
                </button>

                {expanded && (
                  <div className="ums-demo-form space-y-3 rounded-2xl border border-white/10 bg-white/95 p-4 text-ink">
                    <div className="vd-2col">
                      <div className="vd-field-compact">
                        <label htmlFor="ums-demo-address">Địa chỉ</label>
                        <input
                          id="ums-demo-address"
                          value={address}
                          placeholder="VD: 123 Main St, Los Angeles, CA"
                          onChange={(e) => setAddress(e.target.value)}
                          disabled={busy}
                        />
                      </div>
                      <div className="vd-field-compact">
                        <label htmlFor="ums-demo-staff">Thợ</label>
                        <input
                          id="ums-demo-staff"
                          value={staffText}
                          placeholder="Lan, Mai, Thu"
                          onChange={(e) => setStaffText(e.target.value)}
                          disabled={busy}
                        />
                      </div>
                    </div>
                    <div className="vd-2col">
                      <div className="vd-field-compact">
                        <label htmlFor="ums-demo-ph">Giờ chính</label>
                        <input
                          id="ums-demo-ph"
                          value={primaryHours}
                          onChange={(e) => setPrimaryHours(e.target.value)}
                          disabled={busy}
                        />
                      </div>
                      <div className="vd-field-compact">
                        <label htmlFor="ums-demo-sh">Giờ phụ</label>
                        <input
                          id="ums-demo-sh"
                          value={secondaryHours}
                          onChange={(e) => setSecondaryHours(e.target.value)}
                          disabled={busy}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="vd-svc-label">Dịch vụ</div>
                      <div className="vd-tabs" role="tablist" aria-label="Danh mục dịch vụ">
                        {serviceCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={selectedCategory === cat.id}
                            className={`vd-tab ${selectedCategory === cat.id ? 'on' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                            disabled={busy}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                      <div className="vd-svc-list">
                        {activeCategory?.items.map((item, idx) => (
                          <div key={`${activeCategory.id}-${item.name}`} className="vd-svc-row">
                            <input
                              type="checkbox"
                              checked={item.enabled}
                              disabled={busy}
                              onChange={(e) =>
                                updateService(activeCategory.id, idx, { enabled: e.target.checked })
                              }
                              aria-label={item.name}
                            />
                            <div className="vd-svc-info">
                              <div className={`vd-svc-name${item.enabled ? '' : ' is-off'}`}>{item.name}</div>
                              {item.duration ? <div className="vd-svc-dur">{item.duration}</div> : null}
                            </div>
                            <div className={`vd-svc-price-wrap${item.enabled ? '' : ' is-off'}`}>
                              <span>$</span>
                              <input
                                className="vd-svc-price"
                                type="number"
                                inputMode="numeric"
                                min={0}
                                value={item.price}
                                disabled={busy || !item.enabled}
                                onChange={(e) =>
                                  updateService(activeCategory.id, idx, {
                                    price: Number(e.target.value) || 0,
                                  })
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {turnstileSiteKey ? (
                  <TurnstileWidget
                    siteKey={turnstileSiteKey}
                    onToken={setCaptchaToken}
                    resetSignal={turnstileReset}
                  />
                ) : (
                  <p className="text-xs text-white/45">
                    Dev mode: chưa có Turnstile site key — dùng bypass khi RingBooker cho phép.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => void (busy && stage === 'live' ? handleEnd() : handleStart())}
                  disabled={stage === 'connecting'}
                  className="inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-full bg-[#2F7D4F] px-10 py-5 text-lg font-semibold text-white shadow-md transition hover:bg-[#276a43] disabled:cursor-wait disabled:opacity-70 sm:min-h-[4.25rem] sm:w-auto sm:px-12 sm:text-xl"
                >
                  {stage === 'live' ? (
                    <>
                      <PhoneOff className="h-6 w-6" />
                      Kết thúc gọi thử
                    </>
                  ) : stage === 'connecting' ? (
                    'Đang kết nối…'
                  ) : (
                    <>
                      <Phone className="h-6 w-6" />
                      Bắt đầu gọi thử
                    </>
                  )}
                </button>

                <p className="text-sm leading-6 text-white/55">
                  Không cần số điện thoại — và không có gì được đặt thật.
                </p>

                {inAppHint && !error && (
                  <p className="rounded-xl border border-goldSoft/40 bg-goldSoft/15 px-3 py-2 text-sm leading-6 text-cream/90">
                    {inAppHint}
                  </p>
                )}
                {error && (
                  <p className="rounded-xl border border-blush/40 bg-blush/15 px-3 py-2 text-sm leading-6 text-cream">
                    {error}
                  </p>
                )}
                {statusText && !error && (
                  <p className="text-sm font-medium text-white/70">{statusText}</p>
                )}
              </div>
            </div>

            {/* Right: RingBooker vd-phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <DemoPhone
                shopName={displayName}
                stage={stage}
                onCall={() => void (stage === 'live' ? handleEnd() : handleStart())}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoPhone({
  shopName,
  stage,
  onCall,
}: {
  shopName: string;
  stage: DemoCallStage;
  onCall: () => void;
}) {
  const connecting = stage === 'connecting';
  const live = stage === 'live';
  const ended = stage === 'ended' || stage === 'failed';

  return (
    <div className="ums-vd-phone-root">
      <div className="vd-phone">
        <div className="vd-phone-top">
          <span className="vd-phone-time">9:41</span>
          <span className="vd-phone-icons">● ▲ ■</span>
        </div>
        <div className="vd-phone-avatar" aria-hidden />
        <div className="vd-phone-name">{shopName}</div>
        <div className="vd-phone-subtitle">{phoneSubtitle(stage)}</div>
        <div className="vd-phone-mid">
          {connecting ? (
            <div className="vd-phone-connecting" aria-live="polite">
              <span className="vd-phone-connecting-dot" aria-hidden />
              Đang kết nối…
            </div>
          ) : ended ? (
            <div style={{ textAlign: 'center', fontSize: 28 }}>✓</div>
          ) : (
            <div className="vd-phone-wave" aria-hidden={!live}>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
        <div className="vd-phone-dock">
          {live ? (
            <div className="vd-phone-ios-act">
              <button
                type="button"
                className="vd-phone-ios-btn vd-phone-ios-btn--end"
                onClick={onCall}
                aria-label="Kết thúc gọi"
              >
                <span className="vd-phone-ios-btn-face vd-phone-ios-btn-face--end" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                      transform="rotate(135 12 12)"
                    />
                  </svg>
                </span>
              </button>
              <span className="vd-phone-ios-label">Kết thúc</span>
            </div>
          ) : null}
          {stage === 'idle' || connecting ? (
            <div className="vd-phone-ios-act">
              <button
                type="button"
                className="vd-phone-ios-btn vd-phone-ios-btn--accept"
                onClick={onCall}
                disabled={connecting}
                aria-label="Bắt đầu gọi thử"
              >
                <span className="vd-phone-ios-btn-face" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
              </button>
              <span className="vd-phone-ios-label">
                {connecting ? 'Đang kết nối…' : 'Bắt đầu gọi thử'}
              </span>
            </div>
          ) : null}
          {ended ? (
            <div className="vd-phone-ios-act">
              <button
                type="button"
                className="vd-phone-ios-btn vd-phone-ios-btn--accept"
                onClick={onCall}
                aria-label="Gọi thử lại"
              >
                <span className="vd-phone-ios-btn-face" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
              </button>
              <span className="vd-phone-ios-label">Gọi thử lại</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
