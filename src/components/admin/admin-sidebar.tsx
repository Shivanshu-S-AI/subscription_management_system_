"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Layers,
  Repeat,
  Package,
  CalendarDays,
  Percent,
  Receipt,
  FileText,
  CreditCard,
  BarChart3,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { signOutAction } from "@/modules/auth/actions";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavGroup {
  groupName?: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    groupName: "Sales & Customers",
    items: [
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Quotations", href: "/admin/quotations", icon: FileText },
      { name: "Quotation Templates", href: "/admin/quotation-templates", icon: Layers },
    ],
  },
  {
    groupName: "Subscriptions",
    items: [
      { name: "All Subscriptions", href: "/admin/subscriptions", icon: Repeat },
    ],
  },
  {
    groupName: "Catalog & Pricing",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Plans", href: "/admin/plans", icon: CalendarDays },
      { name: "Taxes", href: "/admin/taxes", icon: Percent },
      { name: "Discounts", href: "/admin/discounts", icon: FileSpreadsheet },
    ],
  },
  {
    groupName: "Finance",
    items: [
      { name: "Recurring Billing", href: "/admin/billing", icon: Receipt },
      { name: "Invoices", href: "/admin/invoices", icon: FileText },
      { name: "Payments", href: "/admin/payments", icon: CreditCard },
    ],
  },
  {
    groupName: "Management",
    items: [
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
      { name: "Team Management", href: "/admin/team", icon: UserCheck },
    ],
  },
];

export function AdminSidebar({
  isOpen = false,
  onClose,
  isDesktopOpen = true,
  onToggleDesktop,
  userName,
  userEmail,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  isDesktopOpen?: boolean;
  onToggleDesktop?: () => void;
  userName?: string;
  userEmail?: string;
}) {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-hairline bg-canvas transition-all duration-300 ease-in-out lg:static ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } ${
          isDesktopOpen
            ? "lg:w-64 lg:border-r lg:opacity-100"
            : "lg:w-0 lg:border-r-0 lg:overflow-hidden lg:opacity-0 lg:pointer-events-none"
        }`}
      >
        <div className="w-64 flex flex-col h-full min-h-0 shrink-0">
          {/* Brand Header */}
          <div className="flex h-14 items-center justify-between border-b border-hairline px-4 shrink-0">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-ink text-white shadow-whisper">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-sans text-sm font-semibold tracking-tight text-ink block">
                Brightloop
              </span>
            </Link>

            {/* Hide / Close navigation button */}
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                  onClose?.();
                } else {
                  onToggleDesktop?.();
                }
              }}
              title="Hide navigation menu"
              aria-label="Hide navigation menu"
              className="flex h-7 w-7 items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-mute hover:text-ink transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation list */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              {group.groupName && (
                <div className="px-3 mb-2 font-mono text-[10px] uppercase tracking-wider text-mute">
                  {group.groupName}
                </div>
              )}
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isCurrent(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between rounded-sm px-3 py-2 text-xs font-medium transition-colors ${
                        active
                          ? "bg-canvas-elevated text-ink font-semibold border border-hairline shadow-whisper"
                          : "text-body hover:bg-canvas-elevated hover:text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 ${active ? "text-ink" : "text-mute"}`} />
                        <span>{item.name}</span>
                      </div>
                      {active && <ChevronRight className="h-3 w-3 text-mute" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer / Account section */}
        <div className="border-t border-hairline p-3 bg-canvas">
          <div className="rounded-sm border border-hairline bg-canvas-elevated p-2.5 shadow-whisper">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <span className="block text-xs font-medium text-ink truncate">
                  {userName || "Administrator"}
                </span>
                <span className="block font-mono text-[10px] text-mute truncate">
                  {userEmail || "admin@brightloopsoftware.com"}
                </span>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  title="Sign Out"
                  className="flex h-7 w-7 items-center justify-center rounded-sm border border-hairline bg-canvas text-mute hover:text-error hover:border-error/30 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}

