"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, X, Send, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "ai"; content: string }>
  >([
    {
      role: "ai",
      content: "Hi! I'm your AI learning assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

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

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI chat"
            data-testid="floating-ai"
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] shadow-2xl flex items-center justify-center z-50 group"
          >
            <Brain className="w-8 h-8 text-white animate-pulse" aria-hidden="true" />
            <span
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              aria-label="New message available"
            ></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-96 z-50"
          >
            <Card className="shadow-2xl overflow-hidden border-0 rounded-2xl" data-testid="ai-chat-panel">
              {/* Header */}
              <div className="bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] p-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">AI Learning Assistant</h3>
                    <p className="text-xs text-blue-100">
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user"
                          ? "bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                          : "bg-white text-gray-800 shadow-sm"
                        }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </motion.div>
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
                    aria-label="Send message"
                    className="bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                    size="sm"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by NeuralGuru AI
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
