"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  ChevronsLeft,
  ChevronsRight,
  User,
  Upload,
  Calendar,
  DollarSign,
  GraduationCap,
  BarChart3,
  Activity,
  Settings,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  badge?: string;
  icon: React.ElementType;
};

type Role = "student" | "tutor" | "admin";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [currentPage, setCurrentPage] = useState<string>("student-dashboard");
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("roles") as Role;
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole("student"); // Default role
    }
  }, [role]);

  const studentMenuItems: MenuItem[] = useMemo(
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

  const tutorMenuItems: MenuItem[] = useMemo(
    () => [
      { id: "tutor-dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { id: "tutor-students", icon: User, label: "My Students" },
      { id: "tutor-upload", icon: Upload, label: "Upload Test Results" },
      { id: "tutor-insights", icon: Brain, label: "AI Insights" },
      { id: "tutor-materials", icon: BookOpen, label: "Materials" },
      { id: "tutor-bookings", icon: Calendar, label: "Bookings" },
      { id: "tutor-earnings", icon: DollarSign, label: "Earnings" },
    ],
    []
  );

  const adminMenuItems: MenuItem[] = useMemo(
    () => [
      { id: "admin-dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { id: "admin-tutors", icon: User, label: "Manage Tutors" },
      { id: "admin-students", icon: GraduationCap, label: "Manage Students" },
      { id: "admin-analytics", icon: Brain, label: "AI Analytics" },
      { id: "admin-results", icon: FileText, label: "Test Results" },
      { id: "admin-reports", icon: BarChart3, label: "Reports" },
      { id: "admin-logs", icon: Activity, label: "System Logs" },
      { id: "admin-settings", icon: Settings, label: "Settings" },
    ],
    []
  );

  const activeMenuItems = useMemo(() => {
    switch (role) {
      case "tutor":
        return tutorMenuItems;
      case "admin":
        return adminMenuItems;
      case "student":
      default:
        return studentMenuItems;
    }
  }, [role, studentMenuItems, tutorMenuItems, adminMenuItems]);

  return (
    <>
      <aside
        className={`
          fixed left-0
          top-14 lg:top-16
          h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)]
          bg-white border-r border-gray-200
          transition-all duration-300 z-30 
          ${isCollapsed ? "w-20" : "w-64"}
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === item.id
                  ? "bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
                  } ${isCollapsed ? "justify-center px-2" : ""}`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="flex-1 text-left">{item.label}</span>}
                {item.badge && currentPage !== item.id && !isCollapsed && (
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
