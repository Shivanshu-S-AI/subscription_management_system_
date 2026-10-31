"use client";

import { useState } from "react";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { StaffHeader } from "@/components/staff/staff-header";

export function StaffLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const handleToggleMenu = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-canvas font-sans text-body antialiased">
      {/* Sidebar */}
      <StaffSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isDesktopOpen={desktopSidebarOpen}
        onToggleDesktop={() => setDesktopSidebarOpen((prev) => !prev)}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0 transition-all duration-200">
        <StaffHeader
          onMenuClick={handleToggleMenu}
          isSidebarOpen={desktopSidebarOpen}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
