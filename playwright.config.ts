/**
 * Playwright Configuration for Next.js E2E Testing
 * @see https://playwright.dev/docs/test-configuration
 */

import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // =============================================================================
  // Test Directory Configuration
  // =============================================================================

  // Test files location
  testDir: "./src/test/e2e",

  // Test file pattern
  testMatch: "**/*.e2e-spec.{ts,tsx}",

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"],
  ],

  // =============================================================================
  // Global Test Settings
  // =============================================================================

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: "http://localhost:3000",

    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure for debugging
    video: "retain-on-failure",

    // Default timeout for each action
    actionTimeout: 10000,

    // Browser context options
    contextOptions: {
      // Ignore HTTPS errors
      ignoreHTTPSErrors: true,
    },
  },

  // =============================================================================
  // Test Timeout Configuration
  // =============================================================================

  // Maximum time one test can run
  timeout: 30000,

  // Maximum time one test can run
  expect: {
    // Maximum time expect() should wait for the condition to be met
    timeout: 5000,
  },

  // =============================================================================
  // Browser Projects Configuration
  // =============================================================================

  projects: [
    // Desktop browsers
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Mobile browsers (uncomment to enable mobile testing)
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },

    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
      },
    },

    // Tablet browsers (uncomment to enable tablet testing)
    // {
    //   name: "iPad",
    //   use: {
    //     ...devices["iPad Pro 11"],
    //   },
    // },
  ],

  // =============================================================================
  // Web Server Configuration
  // =============================================================================

  // Configure web server to run before tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes to start the server
    stdout: "ignore",
    stderr: "pipe",
  },
});
