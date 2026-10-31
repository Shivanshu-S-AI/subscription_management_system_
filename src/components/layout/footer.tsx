import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink text-white">
                <svg
                  className="h-3.5 w-3.5"
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
                Brightloop Software
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-mute max-w-sm">
              Unified data analysis software engineered to help teams explore complex datasets,
              visualize patterns, and make informed operational decisions.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#capabilities" className="text-body hover:text-ink transition-colors">
                  Data Exploration
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="text-body hover:text-ink transition-colors">
                  Visualizations
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="text-body hover:text-ink transition-colors">
                  Pattern Engine
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="text-body hover:text-ink transition-colors">
                  Reporting
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Resources */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-3">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#how-it-works" className="text-body hover:text-ink transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-body hover:text-ink transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-body hover:text-ink transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-body hover:text-ink transition-colors">
                  Customer Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="mailto:support@brightloopsoftware.com" className="text-body hover:text-ink transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-body hover:text-ink transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-body hover:text-ink transition-colors">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 text-xs text-mute sm:flex-row">
          <p>© {new Date().getFullYear()} Brightloop Software Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

