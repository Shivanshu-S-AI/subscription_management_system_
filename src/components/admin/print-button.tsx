"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-sm bg-ink px-4 py-1.5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
    >
      <Printer className="h-3.5 w-3.5" />
      <span>Print / Save PDF</span>
    </button>
  );
}

