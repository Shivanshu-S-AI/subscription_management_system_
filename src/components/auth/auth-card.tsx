import Link from "next/link";
import React from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({
  title,
  subtitle,
  eyebrow,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-[420px] mx-auto px-4 py-8">
      {/* Brand icon / logo */}
      <div className="text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink text-white shadow-whisper transition-transform duration-200 group-hover:scale-105">
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
          <span className="font-sans text-base font-semibold tracking-tight text-ink">
            Brightloop
          </span>
        </Link>
      </div>

      {/* Surface Card */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 sm:p-8 shadow-whisper">
        {eyebrow && (
          <div className="mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="font-sans text-xl font-semibold tracking-[-0.4px] text-ink">
          {title}
        </h1>
        <p className="mt-1.5 text-xs text-body leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-6">{children}</div>
      </div>

      {/* Supplementary Footer Links */}
      {footer && <div className="mt-6 text-center text-xs text-mute">{footer}</div>}
    </div>
  );
}
