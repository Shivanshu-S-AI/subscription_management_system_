"use client";

import { useState } from "react";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { StaffHeader } from "@/components/staff/staff-header";

export function StaffLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas font-sans text-body antialiased">
      {/* Sidebar */}
      <StaffSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        <StaffHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

