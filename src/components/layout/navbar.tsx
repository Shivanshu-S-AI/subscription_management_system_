"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-ink text-white shadow-whisper transition-transform duration-200 group-hover:scale-105">
            {/* Minimal geometric loop / data node icon */}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
              <path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
            </svg>
          </div>
          <span className="font-sans text-sm font-semibold tracking-tight text-ink">
            Brightloop
          </span>
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#capabilities"
            className="text-sm font-normal text-body transition-colors hover:text-ink"
          >
            Product
          </Link>
          <Link
            href="#features"
            className="text-sm font-normal text-body transition-colors hover:text-ink"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-normal text-body transition-colors hover:text-ink"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-normal text-body transition-colors hover:text-ink"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop Auth CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/login"
            className="inline-flex h-8 items-center justify-center rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink transition-colors hover:bg-canvas hover:border-mute/40"
          >
            Log In
          </Link>
          <Link
            href="/internal-login"
            className="inline-flex h-8 items-center justify-center rounded-sm bg-ink px-3 text-xs font-medium text-white transition-colors hover:bg-black"
          >
            Staff Login
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Toggle mobile menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-ink"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline bg-canvas px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5">
            <Link
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-normal text-body hover:text-ink"
            >
              Product
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-normal text-body hover:text-ink"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-normal text-body hover:text-ink"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-normal text-body hover:text-ink"
            >
              FAQ
            </Link>
          </nav>
          <div className="pt-2 border-t border-hairline flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-9 w-full items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-xs font-medium text-ink"
            >
              Log In
            </Link>
            <Link
              href="/internal-login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-9 w-full items-center justify-center rounded-sm bg-ink text-xs font-medium text-white"
            >
              Staff Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

