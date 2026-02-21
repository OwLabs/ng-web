/**
 * Jest Setup File
 * @see https://jestjs.io/docs/configuration#setupfilesafterenv-array
 *
 * This file runs after the test framework is installed but before tests.
 * Use for global setup, extending matchers, or configuring shared behavior.
 */

import "@testing-library/jest-dom";

// =============================================================================
// Polyfills
// =============================================================================

// jsdom doesn't have structuredClone, which is required by MUI charts
if (typeof structuredClone === "undefined") {
  global.structuredClone = (obj: unknown) => {
    return JSON.parse(JSON.stringify(obj));
  };
}

// =============================================================================
// Next.js Mocks
// =============================================================================

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useSelectedLayoutSegment: () => null,
  useSelectedLayoutSegments: () => [],
  redirect: jest.fn(),
  permanentRedirect: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    className?: string;
    [key: string]: unknown;
  }) => <img src={props.src} alt={props.alt} className={props.className} />,
}));

// =============================================================================
// Browser API Mocks
// =============================================================================

class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  root = null;
  rootMargin = "";
  thresholds = [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
  },
});

// =============================================================================
// Fetch Mock
// =============================================================================

const originalFetch = global.fetch;

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    headers: new Headers(),
  } as Response)
) as jest.Mock;

export const restoreFetch = () => {
  global.fetch = originalFetch;
};

export const mockFetch = (response: unknown, options?: { status?: number; ok?: boolean }) => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: options?.ok ?? true,
      status: options?.status ?? 200,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    } as Response)
  );
};
