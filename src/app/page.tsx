import { SectionA } from '@/components/dashboard/section-a';
import {
  SectionBClient,
  SectionCClient,
  SectionDClient,
} from '@/components/dashboard/client-sections';


export default function Home() {
  return (
    <>
      {/* SSG: Above-the-fold content - rendered server-side */}
      <SectionA />

      {/* CSR: Below-the-fold content - loaded client-side */}
      <SectionCClient />
      <SectionBClient />
      <SectionDClient />
    </>
  );
}
