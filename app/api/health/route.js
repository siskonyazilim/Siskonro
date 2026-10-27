import { NextResponse } from 'next/server';

// Docker/Coolify healthcheck: Strapi veya başka bir dış servise bağlı değildir.
// Yalnızca Node sürecinin istek karşılayabildiğini doğrular.
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } });
}
