"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  X,
  ChevronRight,
  UserCheck,
  FileText,
  Repeat,
  Receipt,
  Users,
} from "lucide-react";
import { globalSearch } from "@/lib/data/store";
import { ThemeToggle } from "@/components/theme-toggle";

interface SearchResult {
  type: "Customer" | "Subscription" | "Invoice" | "Quotation" | "Product";
  title: string;
  subtitle: string;
  url: string;
}

export function StaffHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const searchResults = globalSearch(searchQuery, "staff");
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((seg, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
      return { href, label };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  const getResultIcon = (type: string) => {
    switch (type) {
      case "Customer":
        return <Users className="h-3.5 w-3.5 text-mute" />;
      case "Subscription":
        return <Repeat className="h-3.5 w-3.5 text-mute" />;
      case "Invoice":
        return <Receipt className="h-3.5 w-3.5 text-mute" />;
      case "Quotation":
        return <FileText className="h-3.5 w-3.5 text-mute" />;
      default:
        return <Search className="h-3.5 w-3.5 text-mute" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-hairline bg-canvas/80 backdrop-blur-md px-4 sm:px-6">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-mute hover:text-ink lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-mute font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="h-3 w-3 text-hairline" />}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-ink font-semibold">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-ink transition-colors">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Global Search & Role Pill */}
      <div className="flex items-center gap-3">
        {/* Search Input Container */}
        <div ref={searchRef} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-mute pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search customers, subs, invoices..."
              className="h-8 w-44 sm:w-64 rounded-sm border border-hairline bg-canvas-elevated pl-8 pr-7 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink transition-all shadow-whisper"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="absolute right-2 text-mute hover:text-ink"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute right-0 mt-1.5 w-80 sm:w-96 rounded-sm border border-hairline bg-canvas-elevated p-1 shadow-floating z-50">
              <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mute border-b border-hairline">
                Search Results ({results.length})
              </div>
              <div className="max-h-72 overflow-y-auto py-1 divide-y divide-hairline">
                {results.length === 0 ? (
                  <div className="px-3 py-4 text-center text-xs text-mute">
                    No matching operations records found.
                  </div>
                ) : (
                  results.map((res, i) => (
                    <Link
                      key={i}
                      href={res.url}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-canvas transition-colors"
                    >
                      <div className="p-1 rounded-sm bg-canvas border border-hairline">
                        {getResultIcon(res.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-ink truncate">{res.title}</span>
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-sm bg-canvas border border-hairline text-mute">
                            {res.type}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-mute truncate block">
                          {res.subtitle}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Staff Role Badge & Theme Toggle */}
        <ThemeToggle />
        <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-blue-600">
          <UserCheck className="h-3 w-3" />
          <span className="hidden sm:inline">STAFF</span>
        </div>
      </div>
    </header>
  );
}

