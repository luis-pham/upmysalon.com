import { NextResponse } from 'next/server';
import { callRingbookerDemo } from '@/lib/demo/ringbookerProxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: {
    requestId?: string;
    demoVertical?: string;
    date?: string;
    time?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_payload' }, { status: 400 });
  }

  if (!body.requestId || !body.demoVertical || !body.date || !body.time) {
    return NextResponse.json({ ok: false, code: 'invalid_payload' }, { status: 400 });
  }

  try {
    const { status, body: upstream } = await callRingbookerDemo('/validate-appointment-time', {
      requestId: body.requestId,
      demoVertical: body.demoVertical,
      date: body.date,
      time: body.time,
    });
    return NextResponse.json(upstream, { status });
  } catch (error) {
    console.error('[demo/session/validate]', error);
    return NextResponse.json({ ok: false, code: 'validate_failed' }, { status: 502 });
  }
}
