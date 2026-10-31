"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Repeat,
  Receipt,
  CreditCard,
  BarChart3,
  UserCheck,
  ChevronRight,
  LogOut,
  X,
  Briefcase,
} from "lucide-react";
import { signOutAction } from "@/modules/auth/actions";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/staff", icon: LayoutDashboard },
  { name: "Customers", href: "/staff/customers", icon: Users },
  { name: "Quotations", href: "/staff/quotations", icon: FileText },
  { name: "Subscriptions", href: "/staff/subscriptions", icon: Repeat },
  { name: "Invoices", href: "/staff/invoices", icon: Receipt },
  { name: "Payments", href: "/staff/payments", icon: CreditCard },
  { name: "Operational Reports", href: "/staff/reports", icon: BarChart3 },
  { name: "My Account", href: "/staff/account", icon: UserCheck },
];

export function StaffSidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/staff") return pathname === "/staff";
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
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-hairline bg-canvas transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-between border-b border-hairline px-4">
          <Link href="/staff" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-ink text-white shadow-whisper">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <span className="font-sans text-xs font-semibold tracking-tight text-ink block">
                Brightloop
              </span>
              <span className="font-mono text-[10px] uppercase text-mute tracking-wider block">
                Staff Operations
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-hairline bg-canvas-elevated text-mute hover:text-ink lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 mb-2 font-mono text-[10px] uppercase tracking-wider text-mute">
            Operations
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
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

        {/* Footer / Account section */}
        <div className="border-t border-hairline p-3 bg-canvas">
          <div className="rounded-sm border border-hairline bg-canvas-elevated p-2.5 shadow-whisper">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <span className="block text-xs font-medium text-ink truncate">
                  Operations Staff
                </span>
                <span className="block font-mono text-[10px] text-mute truncate">
                  staff@brightloopsoftware.com
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
      </aside>
    </>
  );
}

