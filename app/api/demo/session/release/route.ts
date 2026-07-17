import { NextResponse } from 'next/server';
import { callRingbookerDemo } from '@/lib/demo/ringbookerProxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: { requestId?: string; endReason?: 'completed' | 'timeout' };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_payload' }, { status: 400 });
  }

  const requestId = typeof body.requestId === 'string' ? body.requestId.trim() : '';
  if (!requestId) {
    return NextResponse.json({ ok: false, code: 'invalid_payload' }, { status: 400 });
  }

  try {
    const { status, body: upstream } = await callRingbookerDemo('/release', {
      requestId,
      endReason: body.endReason === 'timeout' ? 'timeout' : 'completed',
    });
    return NextResponse.json(upstream, { status });
  } catch (error) {
    console.error('[demo/session/release]', error);
    return NextResponse.json({ ok: false, code: 'release_failed' }, { status: 502 });
  }
}
