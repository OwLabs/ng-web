'use client';

import dynamic from 'next/dynamic';

// CSR: Section B with heavy MUI Charts - load only on client (deferred)
const SectionBClient = dynamic(
  () => import('./section-b').then((mod) => ({ default: mod.SectionB })),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 content-visibility-auto">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[360px]" />
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[360px]" />
        </div>
      </div>
    ),
  }
);

// CSR: Section C - load on client for animation
const SectionCClient = dynamic(
  () => import('./section-c').then((mod) => ({ default: mod.SectionC })),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 content-visibility-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[180px]" />
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[180px]" />
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[180px]" />
        </div>
      </div>
    ),
  }
);

// CSR: Section D - load on client for animation (deferred - lowest priority)
const SectionDClient = dynamic(
  () => import('./section-d').then((mod) => ({ default: mod.SectionD })),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 content-visibility-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[140px]" />
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[140px]" />
          <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 h-[140px]" />
        </div>
      </div>
    ),
  }
);

export { SectionBClient, SectionCClient, SectionDClient };
