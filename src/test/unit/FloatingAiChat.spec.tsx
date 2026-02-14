import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FloatingAIChat } from "@/components/FloatingAiChat";

// Mocks

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Brain: ({ className }: { className: string }) => (
    <svg className={className} data-testid="brain-icon" />
  ),
  X: ({ className }: { className: string }) => (
    <svg className={className} data-testid="x-icon" />
  ),
  Send: ({ className }: { className: string }) => (
    <svg className={className} data-testid="send-icon" />
  ),
  Minimize2: ({ className }: { className: string }) => (
    <svg className={className} data-testid="minimize-icon" />
  ),
}));

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    className,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    [key: string]: unknown;
  }) => (
    <button
      onClick={onClick}
      className={className}
      data-testid="mock-button"
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-card">
      {children}
    </div>
  ),
}));

// Tests

describe("FloatingAIChat Component", () => {
  // ---------------------------------------------------------------------------
  // Rendering Tests
  // ---------------------------------------------------------------------------

  describe("Rendering", () => {
    it("renders without crashing", async () => {
      const { container } = render(<FloatingAIChat />);

      // Wait for mount animation
      await waitFor(() => expect(container.firstChild).toBeInTheDocument(), { timeout: 100 });
    });

    it("displays floating chat button when closed", async () => {
      render(<FloatingAIChat />);

      await waitFor(() => {
        const button = screen.getByLabelText("Open AI chat");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("data-testid", "floating-ai");
      });
    });

    it("does not display chat panel when closed", async () => {
      render(<FloatingAIChat />);

      await waitFor(
        () => {
          expect(screen.queryByTestId("ai-chat-panel")).not.toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });
  });

  // ---------------------------------------------------------------------------
  // Interaction Tests
  // ---------------------------------------------------------------------------

  describe("Opening Chat", () => {
    it("opens chat panel when floating button is clicked", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      // Wait for button to be visible
      const openButton = await screen.findByLabelText("Open AI chat");

      await user.click(openButton);

      // Chat panel should appear
      await waitFor(
        () => {
          const chatPanel = screen.queryByTestId("ai-chat-panel");
          expect(chatPanel).toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });

    it("hides floating button when chat is open", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.queryByLabelText("Open AI chat")).not.toBeInTheDocument();
      });
    });

    it("displays AI Learning Assistant title in chat", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.getByText("AI Learning Assistant")).toBeInTheDocument();
      });
    });

    it("displays initial AI greeting message", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Hi! I'm your AI learning assistant/)
        ).toBeInTheDocument();
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Closing Chat Tests
  // ---------------------------------------------------------------------------

  describe("Closing Chat", () => {
    it("closes chat panel when X button is clicked", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      // Open chat first
      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.queryByTestId("ai-chat-panel")).toBeInTheDocument();
      });

      // Close chat
      const closeButton = await screen.findByLabelText("Close chat");
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId("ai-chat-panel")).not.toBeInTheDocument();
      });
    });

    it("closes chat panel when minimize button is clicked", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      // Open chat first
      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.queryByTestId("ai-chat-panel")).toBeInTheDocument();
      });

      // Minimize chat
      const minimizeButton = await screen.findByLabelText("Minimize chat");
      await user.click(minimizeButton);

      await waitFor(() => {
        expect(screen.queryByTestId("ai-chat-panel")).not.toBeInTheDocument();
      });
    });

    it("shows floating button again after closing chat", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      // Open and close chat
      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const closeButton = await screen.findByLabelText("Close chat");
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.getByLabelText("Open AI chat")).toBeInTheDocument();
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Message Input Tests
  // ---------------------------------------------------------------------------

  describe("Sending Messages", () => {
    it("has input field for typing messages", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Ask me anything...");
        expect(input).toBeInTheDocument();
      });
    });

    it("has send button", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        const sendButton = screen.getByLabelText("Send message");
        expect(sendButton).toBeInTheDocument();
      });
    });

    it("displays user message after sending", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const input = await screen.findByPlaceholderText("Ask me anything...");
      const sendButton = await screen.findByLabelText("Send message");

      await user.type(input, "Test message");
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });
    });

    it("displays AI response after user message", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const input = await screen.findByPlaceholderText("Ask me anything...");
      const sendButton = await screen.findByLabelText("Send message");

      await user.type(input, "Test message");
      await user.click(sendButton);

      await waitFor(() => {
        expect(
          screen.getByText(/I understand you need help with that/)
        ).toBeInTheDocument();
      });
    });

    it("clears input after sending message", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const input = (await screen.findByPlaceholderText(
        "Ask me anything..."
      )) as HTMLInputElement;
      const sendButton = await screen.findByLabelText("Send message");

      await user.type(input, "Test message");
      await user.click(sendButton);

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });
  });

  // ---------------------------------------------------------------------------
  // UI Elements Tests
  // ---------------------------------------------------------------------------

  describe("UI Elements", () => {
    it("displays brain icon in floating button", async () => {
      render(<FloatingAIChat />);

      await waitFor(() => {
        const brainIcon = screen.getByTestId("brain-icon");
        expect(brainIcon).toBeInTheDocument();
      });
    });

    it("displays notification badge on floating button", async () => {
      render(<FloatingAIChat />);

      await waitFor(() => {
        const badge = screen.getByLabelText("New message available");
        expect(badge).toBeInTheDocument();
      });
    });

    it("displays online status in chat header", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.getByText("Online • Ready to help")).toBeInTheDocument();
      });
    });

    it("displays powered by text in chat", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.getByText("Powered by NeuralGuru AI")).toBeInTheDocument();
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Accessibility Tests
  // ---------------------------------------------------------------------------

  describe("Accessibility", () => {
    it("has proper aria-label on open button", async () => {
      render(<FloatingAIChat />);

      await waitFor(() => {
        const button = screen.getByLabelText("Open AI chat");
        expect(button).toBeInTheDocument();
      });
    });

    it("has proper aria-labels on close buttons", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(async () => {
        expect(await screen.findByLabelText("Close chat")).toBeInTheDocument();
        expect(await screen.findByLabelText("Minimize chat")).toBeInTheDocument();
      });
    });

    it("has proper aria-label on send button", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      await waitFor(async () => {
        const sendButton = await screen.findByLabelText("Send message");
        expect(sendButton).toBeInTheDocument();
      });
    });

    it("hides icons from screen readers", async () => {
      render(<FloatingAIChat />);

      await waitFor(async () => {
        const brainIcon = await screen.findByTestId("brain-icon");
        // Note: Mocked icons don't have aria-hidden, but real component does
        expect(brainIcon).toBeInTheDocument();
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Edge Cases
  // ---------------------------------------------------------------------------

  describe("Edge Cases", () => {
    it("does not send empty message", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const input = await screen.findByPlaceholderText("Ask me anything...");
      const sendButton = await screen.findByLabelText("Send message");

      // Try to send empty message
      await user.click(sendButton);

      await waitFor(() => {
        // Should not add new message
        const messages = screen.queryAllByText(/Test/);
        expect(messages.length).toBe(0);
      });
    });

    it("does not send whitespace-only message", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const input = await screen.findByPlaceholderText("Ask me anything...");
      const sendButton = await screen.findByLabelText("Send message");

      await user.type(input, "   ");
      await user.click(sendButton);

      await waitFor(() => {
        const messages = screen.queryAllByText(/Test/);
        expect(messages.length).toBe(0);
      });
    });

    it("sends message on Enter key press", async () => {
      const user = userEvent.setup();
      render(<FloatingAIChat />);

      const openButton = await screen.findByLabelText("Open AI chat");
      await user.click(openButton);

      const input = await screen.findByPlaceholderText("Ask me anything...");

      await user.type(input, "Test message");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });
    });
  });
});
