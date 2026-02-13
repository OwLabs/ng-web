"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  /**
   * - NextJS 13 and above use `useRouter` from next/navigation because latest pattern of project structure use App Router
   * - App Router ----> https://nextjs.org/docs/app/getting-started/project-structure
   * - We have to use this method because it will redirect back to the landing page
   * - ng-homeland is in another repository
   */
  const handleLogout = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            aria-label="Open menu"
            className="text-gray-800 md:hidden hover:text-gray-600 transition-colors min-h-11 min-w-11 flex items-center justify-center touch-manipulation"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex flex-col-2 gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} loading="eager" fetchPriority="high" sizes="32px" />
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer min-h-[44px] touch-manipulation"
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
