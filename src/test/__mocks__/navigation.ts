export const createMockRouter = (overrides = {}) => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
  ...overrides,
});

export const createMockNavigation = (pathname = "/", searchParams = "") => ({
  pathname,
  searchParams: new URLSearchParams(searchParams),
});

// Fetch/API Mock Helpers

export const mockApiSuccess = <T>(data: T, options?: { delay?: number }) => {
  const response = {
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  };

  if (options?.delay) {
    return new Promise<typeof response>((resolve) =>
      setTimeout(() => resolve(response), options.delay)
    );
  }

  return Promise.resolve(response);
};

export const mockApiError = (message: string, status = 500) => {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve({ error: message }),
    text: () => Promise.resolve(message),
  });
};

// Authentication Mock Helpers
// Mock user session data

export interface MockSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expires: string;
}

// Creates a mock session for testing authenticated components

export const createMockSession = (overrides = {}): MockSession => ({
  user: {
    id: "test-user-id",
    email: "test@example.com",
    name: "Test User",
    role: "user",
  },
  expires: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
  ...overrides,
});

 // Creates a mock useSession hook return value

export const createMockUseSession = (session: MockSession | null = null) => ({
  data: session,
  status: session ? "authenticated" : "unauthenticated",
  update: jest.fn(),
});

// Event Helpers

// Creates a mock form submit event
export const createMockSubmitEvent = () => {
  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    currentTarget: {
      elements: {},
    },
  };
  return event as unknown as React.FormEvent;
};

// Wait Helpers

/**
 * Waits for a specified number of milliseconds
 * Useful for waiting for state updates or animations
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Waits for the next tick in the event loop
 */
export const nextTick = () => new Promise((resolve) => process.nextTick(resolve));

// localStorage Helpers

/**
 * Creates a mock localStorage implementation
 */
export const createMockLocalStorage = () => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
};

export {};
