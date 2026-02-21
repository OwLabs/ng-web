"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  /**
   * - NextJS 13 and above use `useRouter` from next/navigation because latest pattern of project structure use App Router
   * - App Router ----> https://nextjs.org/docs/app/getting-started/project-structure
   * - We have to use this method because it will redirect back to the landing page
   * - ng-homeland is in another repository
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "https://www.google.com";
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" data-testid="navbar" aria-label="Main navigation">
      <div className="max-w-full mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-gray-800 md:hidden hover:text-gray-600 transition-colors"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex flex-col-2 gap-2">
            <Image src="/logo.png" alt="NeuralGuru Logo" width={32} height={32} loading="eager" fetchPriority="high" />
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer min-h-11 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
