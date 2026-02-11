"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  badge?: string;
  icon: React.ElementType;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [currentPage, setCurrentPage] = useState<string>("student-dashboard");

  const menuItems: MenuItem[] = useMemo(
    () => [
      { id: "student-dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { id: "student-insight", icon: Brain, label: "AI Practice" },
      { id: "student-materials", icon: BookOpen, label: "Materials" },
      { id: "student-report", icon: FileText, label: "Reports" },
      { id: "student-bookings", icon: Users, label: "Book Tutor" },
      { id: "student-payments", icon: CreditCard, label: "Payments" },
    ],
    []
  );

  return (
    <>
      <aside
        className={`
          fixed left-0
          top-14 lg:top-16
          h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)]
          bg-white border-r border-gray-200
          transition-transform duration-300 z-30 w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentPage(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === item.id
                  ? "bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && currentPage !== item.id && (
                  <span className="px-2 py-0.5 text-xs bg-purple-600 text-white rounded-full">
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
