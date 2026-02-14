/**
 * Jest Setup File
 * This file runs before each test file and sets up the testing environment.
 * @see https://testing-library.com/docs/react-testing-library/setup
 */

import "@testing-library/jest-dom";

// =============================================================================
// structuredClone Polyfill
// =============================================================================

// jsdom doesn't have structuredClone, which is required by MUI charts
if (typeof structuredClone === "undefined") {
  global.structuredClone = (obj: unknown) => {
    return JSON.parse(JSON.stringify(obj));
  };
}

// =============================================================================
// Next.js Navigation Mocks
// =============================================================================

// Mock next/navigation hooks
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

// Mock next/image to avoid issues with image optimization in tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    onLoad?: () => void;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={props.src} alt={props.alt} className={props.className} />;
  },
}));


// Store original fetch for restoration if needed
const originalFetch = global.fetch;

/**
 * Mock fetch for API calls in tests
 * Can be overridden in individual test files
 */
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

/**
 * Helper to restore original fetch
 */
export const restoreFetch = () => {
  global.fetch = originalFetch;
};

/**
 * Helper to mock fetch with custom response
 */
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

// Intersection Observer Mock
// Mock IntersectionObserver for components that use it
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

// Resize Observer Mock
// Mock ResizeObserver for components that use it
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

// Match Media Mock
// Mock matchMedia for responsive components
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

// ScrollTo Mock
// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

// localStorage Mock
// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Console Error Suppression (Useful to testing error state)
//
// NOTE: Suppressing warnings is NOT ideal - it hides potential issues.
// These act(...) warnings come from MUI charts (third-party lib).
// Better approach: Mock chart components to avoid this entirely.
//
// If you prefer no suppression, remove this block and accept the warnings.

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const firstArg = args[0];

    // Suppress React development warnings that are expected in tests
    if (typeof firstArg === "string") {
      // Suppress act(...) warnings
      if (firstArg.includes("act(...")) {
        return;
      }
      // Suppress Warning: messages
      if (firstArg.includes("Warning:")) {
        return;
      }
    }

    // Suppress Error objects with specific messages
    if (firstArg instanceof Error) {
      if (firstArg.message.includes("act(...)")) {
        return;
      }
    }

    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

// Global Test Utilities

/**
 * Helper to wait for state updates in tests
 */
export const waitFor = async (ms: number = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Helper to create a mock function that returns a specific value
 */
export const createMockFn = <T>(returnValue: T) => {
  return jest.fn().mockReturnValue(returnValue);
};

export {};
