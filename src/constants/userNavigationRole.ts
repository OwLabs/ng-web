import {
    LayoutDashboard,
    Brain,
    BookOpen,
    FileText,
    Users,
    CreditCard,
    User,
    Upload,
    Calendar,
    DollarSign,
    GraduationCap,
    BarChart3,
    Activity,
    Settings
} from "lucide-react";
import React from "react";

export type MenuItem = {
    id: string;
    label: string;
    badge?: string;
    icon: React.ElementType;
};

export type Role = "student" | "tutor" | "admin";

export const studentMenuItems: MenuItem[] = [
    { id: "student-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "student-insight", icon: Brain, label: "AI Practice" },
    { id: "student-materials", icon: BookOpen, label: "Materials" },
    { id: "student-report", icon: FileText, label: "Reports" },
    { id: "student-bookings", icon: Users, label: "Book Tutor" },
    { id: "student-payments", icon: CreditCard, label: "Payments" },
];

export const tutorMenuItems: MenuItem[] = [
    { id: "tutor-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "tutor-students", icon: User, label: "My Students" },
    { id: "tutor-upload", icon: Upload, label: "Upload Test Results" },
    { id: "tutor-insights", icon: Brain, label: "AI Insights" },
    { id: "tutor-materials", icon: BookOpen, label: "Materials" },
    { id: "tutor-bookings", icon: Calendar, label: "Bookings" },
    { id: "tutor-earnings", icon: DollarSign, label: "Earnings" },
];

export const adminMenuItems: MenuItem[] = [
    { id: "admin-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "admin-tutors", icon: User, label: "Manage Tutors" },
    { id: "admin-students", icon: GraduationCap, label: "Manage Students" },
    { id: "admin-analytics", icon: Brain, label: "AI Analytics" },
    { id: "admin-results", icon: FileText, label: "Test Results" },
    { id: "admin-reports", icon: BarChart3, label: "Reports" },
    { id: "admin-logs", icon: Activity, label: "System Logs" },
    { id: "admin-settings", icon: Settings, label: "Settings" },
];

export const menuItemsByRole: Record<Role, MenuItem[]> = {
    student: studentMenuItems,
    tutor: tutorMenuItems,
    admin: adminMenuItems,
};
