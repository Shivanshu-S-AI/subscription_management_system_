"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Shield, ArrowUpRight } from "lucide-react";
import { globalSearch } from "@/lib/data/store";

export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Generate readable breadcrumb from pathname
  const segments = pathname.split("/").filter(Boolean);
  const currentTitle =
    segments.length <= 1
      ? "Overview Dashboard"
      : segments[1]
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length > 0) {
      const results = globalSearch(val);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-hairline bg-canvas/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-ink lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/admin"
            className="text-mute hover:text-ink transition-colors font-mono uppercase tracking-wider text-[11px]"
          >
            Admin
          </Link>
          <span className="text-mute/60">/</span>
          <span className="font-semibold text-ink">{currentTitle}</span>
        </div>
      </div>

      {/* Center/Right: Global Search */}
      <div className="relative w-72 sm:w-80">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-mute" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery && setIsSearching(true)}
            placeholder="Search records, subscriptions, invoices..."
            className="h-8 w-full rounded-sm border border-hairline bg-canvas-elevated pl-8 pr-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
          />
        </div>

        {/* Global Search Results Dropdown */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute right-0 top-10 z-50 w-80 sm:w-96 rounded-md border border-hairline bg-canvas-elevated p-2 shadow-floating">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-mute border-b border-hairline-soft mb-1 flex justify-between items-center">
              <span>Matching Records</span>
              <button
                onClick={() => setIsSearching(false)}
                className="text-[10px] hover:text-ink text-mute"
              >
                Close
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto space-y-1">
              {searchResults.map((res, i) => (
                <Link
                  key={i}
                  href={res.url}
                  onClick={() => {
                    setIsSearching(false);
                    setSearchQuery("");
                  }}
                  className="flex items-start justify-between rounded-sm p-2 text-xs hover:bg-canvas transition-colors group"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-xs bg-canvas px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider text-mute border border-hairline">
                        {res.type}
                      </span>
                      <span className="font-medium text-ink group-hover:text-link transition-colors">
                        {res.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-mute block mt-0.5 truncate">
                      {res.subtitle}
                    </span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-mute group-hover:text-ink shrink-0 ml-2 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Status Pill */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-canvas-elevated px-2.5 py-1 text-[11px] font-mono text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>OPS READY</span>
        </span>
      </div>
    </header>
  );
}

