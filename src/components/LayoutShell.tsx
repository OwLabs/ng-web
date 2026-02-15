"use client";

import { useState, type ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FloatingAIChat } from "./FloatingAiChat";

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((open) => !open);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((collapsed) => !collapsed);
  };

  return (
    <>
      {/* Navbar spans full width and controls sidebar on mobile */}
      <Navbar onMenuClick={handleToggleSidebar} />

      {/* Below the navbar, sidebar + main content are laid out side by side */}
      <div className="flex min-h-screen bg-white">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
        <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          <main className="px-4 sm:px-6 py-6">{children}</main>
          <FloatingAIChat />
        </div>
      </div>
    </>
  );
}

