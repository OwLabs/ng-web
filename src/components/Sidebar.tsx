"use client";

import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { menuItemsByRole, type Role } from "@/constants/userNavigationRole";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [currentPage, setCurrentPage] = useState<string>("student-dashboard");
  const [role, setRole] = useState<Role>("student");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("roles") as Role;
    if (storedRole) {
      requestAnimationFrame(() => {
        setRole(storedRole);
        setCurrentPage(`${storedRole}-dashboard`);
      });
    }
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  const activeMenuItems = menuItemsByRole[role];

  if (!mounted) return null;

  return (
    <>
      <aside
        className={`
          fixed left-0
          top-14 lg:top-16
          h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)]
          bg-white border-r border-gray-200
          transition-all duration-300 z-30
          w-64 ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Toggle Button - Desktop */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse();
            }}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-500 hover:text-[#1E3A8A] hover:border-[#3B82F6] transition-colors z-50 cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronsRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronsLeft className="w-3.5 h-3.5" />
            )}
          </button>
          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2">
            {activeMenuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentPage(item.id);
                  onClose();
                }}
                title={item.label}
                aria-current={currentPage === item.id ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all overflow-hidden whitespace-nowrap ${
                  currentPage === item.id
                    ? "bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className="w-5 h-5 shrink-0"
                  aria-hidden="true"
                  focusable="false"
                />
                <span
                  className={`flex-1 text-left transition-all duration-300 ${isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"}`}
                >
                  {item.label}
                </span>
                {item.badge && currentPage !== item.id && (
                  <span
                    className={`px-2 py-0.5 text-xs bg-purple-600 text-white rounded-full transition-all duration-300 ${isCollapsed ? "lg:hidden" : ""}`}
                    aria-hidden="true"
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
