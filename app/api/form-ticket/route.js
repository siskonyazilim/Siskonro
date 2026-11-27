import { issueFormTicket } from '../../../lib/security/formGuard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** İletişim formu açılınca çağrılır; imzalı "form açılış zamanı" bileti döner (bkz. lib/security/formGuard.js). */
export async function GET() {
  const ticket = issueFormTicket();
  return Response.json(
    { ticket },
    { status: ticket ? 200 : 503, headers: { 'Cache-Control': 'no-store, max-age=0' } }
  );
}
