"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Repeat,
  Receipt,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Layers,
} from "lucide-react";
import { signOutAction } from "@/modules/auth/actions";

interface PortalNavbarProps {
  userEmail?: string;
  customerName?: string;
}

const navLinks = [
  { name: "Overview", href: "/portal", icon: LayoutDashboard },
  { name: "My Subscriptions", href: "/portal/subscriptions", icon: Repeat },
  { name: "My Invoices", href: "/portal/invoices", icon: Receipt },
  { name: "My Account", href: "/portal/account", icon: User },
];

export function PortalNavbar({ userEmail, customerName }: PortalNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCurrent = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas-elevated/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/portal" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-ink text-white shadow-whisper">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold text-xs text-ink block leading-tight">
                Brightloop
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-mute block leading-tight">
                Customer Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isCurrent(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                    active
                      ? "bg-canvas text-ink font-semibold border border-hairline shadow-whisper"
                      : "text-body hover:text-ink hover:bg-canvas/50"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${active ? "text-ink" : "text-mute"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Pill & Sign Out */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-ink max-w-[180px] truncate">
              {customerName || userEmail}
            </span>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas px-2.5 text-xs font-medium text-mute hover:text-ink hover:bg-canvas-elevated transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-canvas text-mute hover:text-ink"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-canvas-elevated px-4 py-3 space-y-2">
          <div className="px-2 py-1.5 text-xs text-mute font-mono border-b border-hairline mb-2">
            Signed in as: <span className="text-ink font-medium">{customerName || userEmail}</span>
          </div>
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const active = isCurrent(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-medium ${
                    active
                      ? "bg-canvas text-ink font-semibold border border-hairline"
                      : "text-body hover:bg-canvas"
                  }`}
                >
                  <Icon className="h-4 w-4 text-mute" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-hairline">
            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-sm border border-hairline bg-canvas text-xs font-medium text-mute hover:text-error hover:bg-error/5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
