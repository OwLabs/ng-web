// E2E Tests for Dashboard Page

import { test, expect } from "@playwright/test";

test.setTimeout(60000);

test.describe("Dashboard Page E2E Tests", () => {
  test.describe("Page Load", () => {
    test("should load the dashboard page successfully", async ({ page }) => {
      await page.goto("/");

      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL("/");
    });

    test("should display welcome header", async ({ page }) => {
      await page.goto("/");

      const welcomeHeader = page.locator("h1").filter({
        hasText: /welcome/i,
      });
      await expect(welcomeHeader).toBeVisible();
    });

    test("should display learning journey subtitle", async ({ page }) => {
      await page.goto("/");

      const subtitle = page.locator("text=/learning journey/i");
      await expect(subtitle).toBeVisible();
    });
  });

  // AI Insight Section Tests

  test.describe("AI Insight Section", () => {
    test("should display AI insight card", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const aiInsight = page.locator("text=/ai insight/i");
      await expect(aiInsight).toBeVisible();
    });

    test("should display action needed badge", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const badge = page.locator("text=/action needed/i");
      await expect(badge).toBeVisible();
    });

    test("should display KBAT pattern weakness info", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const weakness = page.locator("text=/kbat pattern weakness/i");
      await expect(weakness).toBeVisible();
    });

    test("should have Start AI Practice button", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const practiceButton = page.locator("button").filter({
        hasText: /start ai practice/i,
      });

      await expect(practiceButton).toBeVisible();
      await expect(practiceButton).toBeEnabled();
    });
  });

  // Navbar Tests

  test.describe("Navbar", () => {
    test("should display navbar", async ({ page }) => {
      await page.goto("/");
      const navbar = page.locator("nav, [data-testid='navbar'], header");
      await expect(navbar.first()).toBeVisible();
    });
  });

  // AI Float Widget Tests

  test.describe("AI Float Widget", () => {
    test("should display AI float widget", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const aiWidget = page.locator(
        "[data-testid='ai-widget'], [data-testid='floating-ai'], .floating-ai, button[aria-label*='ai'], button[aria-label*='chat']"
      );

      await expect(aiWidget.first()).toBeVisible();
    });

    test("should open AI chat on click", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Find and click the AI widget button
      const aiWidgetButton = page.locator(
        "[data-testid='ai-widget'], [data-testid='floating-ai'], .floating-ai, button[aria-label*='ai'], button[aria-label*='chat']"
      ).first();

      if (await aiWidgetButton.isVisible()) {
        await aiWidgetButton.click();

        // Check if chat panel/modal opens (adjust based on your UI)
        const chatPanel = page.locator(
          "[data-testid='ai-chat-panel'], .ai-chat-panel, [role='dialog']"
        );

        await expect(chatPanel.first()).toBeVisible({ timeout: 3000 });
      }
    });
  });

  // Desktop Tests

  test.describe("Desktop", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("should display dashboard correctly on desktop", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const welcomeHeader = page.locator("h1").filter({
        hasText: /welcome/i,
      });
      await expect(welcomeHeader).toBeVisible();
    });

    test("should display AI widget on desktop", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const aiWidget = page.locator(
        "[data-testid='ai-widget'], [data-testid='floating-ai'], .floating-ai, button[aria-label*='ai'], button[aria-label*='chat']"
      );

      await expect(aiWidget.first()).toBeVisible();
    });
  });

  // Mobile Responsive Tests

  test.describe("Mobile Responsiveness", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("should display welcome header on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const welcomeHeader = page.locator("h1").filter({
        hasText: /welcome/i,
      });
      await expect(welcomeHeader).toBeVisible();
    });

    test("should display AI insight on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const aiInsight = page.locator("text=/ai insight/i");
      await expect(aiInsight).toBeVisible();
    });

    test("should display AI widget on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const aiWidget = page.locator(
        "[data-testid='ai-widget'], [data-testid='floating-ai'], .floating-ai, button[aria-label*='ai'], button[aria-label*='chat']"
      );

      await expect(aiWidget.first()).toBeVisible();
    });
  });

});
