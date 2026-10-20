import { getHizmetPage } from "../../../lib/strapi/services/hizmetler";
import IIoTPageClient from "./IIoTPageClient";

export const dynamic = 'force-dynamic';

export default async function IIoTPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage("iiot", "tr"),
    getHizmetPage("iiot", "en"),
    getHizmetPage("iiot", "ro"),
  ]);

  return <IIoTPageClient trData={trData} enData={enData} roData={roData} />;
}


