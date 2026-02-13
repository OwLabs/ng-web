"use client";

import { useState, useEffect } from "react";
import { Brain, X, Send, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "ai"; content: string }>
  >([
    {
      role: "ai",
      content: "Hi! I'm your AI learning assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user" as const, content: input },
      {
        role: "ai" as const,
        content:
          "I understand you need help with that. Based on your learning pattern, I suggest starting with the fundamentals and then practicing with adaptive questions. Would you like me to generate some practice questions for you?",
      },
    ];

    setMessages(newMessages);
    setInput("");
  };

  // Don't render until mounted (prevents hydration issues and improves TTI)
  if (!isMounted) return null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <Brain className="w-8 h-8 text-white" aria-hidden="true" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" aria-label="New message available"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] sm:w-96 z-50">
          <Card className="shadow-2xl overflow-hidden border-0 rounded-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white">AI Learning Assistant</h2>
                  <p className="text-xs text-white/90">
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize chat"
                  className="text-white hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <Minimize2 className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="text-white hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                />
                <Button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                  size="sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Powered by NeuralGuru AI
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
