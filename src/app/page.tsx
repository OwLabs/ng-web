import { SectionA } from '@/components/dashboard/section-a';
import dynamic from 'next/dynamic';

const SectionB = dynamic(() => import('@/components/dashboard/section-b').then(mod => ({ default: mod.SectionB })), {
  ssr: true,
  loading: () => (
    <div className="mt-8 mb-8">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg border border-gray-200 h-[400px] animate-pulse" />
        <div className="p-6 bg-white rounded-lg border border-gray-200 h-[400px] animate-pulse" />
      </div>
    </div>
  ),
});

const SectionC = dynamic(() => import('@/components/dashboard/section-c').then(mod => ({ default: mod.SectionC })), {
  ssr: true,
  loading: () => (
    <div className="mt-8 mb-8">
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg border border-gray-200 h-[200px] animate-pulse" />
        <div className="p-6 bg-white rounded-lg border border-gray-200 h-[200px] animate-pulse" />
        <div className="p-6 bg-white rounded-lg border border-gray-200 h-[200px] animate-pulse" />
      </div>
    </div>
  ),
});

const SectionD = dynamic(() => import('@/components/dashboard/section-d').then(mod => ({ default: mod.SectionD })), {
  ssr: true,
  loading: () => (
    <div className="mt-8 mb-8">
      <div className="p-6 bg-white rounded-lg border border-gray-200 h-[400px] animate-pulse" />
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <SectionA />
      <SectionC />
      <SectionB />
      <SectionD />
    </>
  );
}
