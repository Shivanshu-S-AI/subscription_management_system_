"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Repeat,
  DollarSign,
  Clock,
  AlertTriangle,
  Play,
  Plus,
  ArrowUp,
  Minus,
  CheckCircle,
} from "lucide-react";
import type { DashboardKPIs } from "@/types/admin";
import { formatCurrency } from "@/lib/utils";

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  value: string;
  label?: string;
  color: string;
}

export function DashboardView({ kpis }: { kpis: DashboardKPIs }) {
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    value: "",
    color: "#10b981",
  });

  const showTooltip = (
    e: React.MouseEvent<SVGCircleElement>,
    date: string,
    value: string,
    color: string,
    label?: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 6,
      date,
      value,
      label,
      color,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="space-y-6">
      {/* Global Floating Tooltip for Sparkline dots */}
      {tooltip.visible && (
        <div
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
          className="pointer-events-none fixed z-50 transform -translate-x-1/2 -translate-y-full mb-1.5 bg-canvas-elevated text-ink rounded-sm px-2 py-1 shadow-floating border border-hairline text-[11px] font-mono tracking-tight flex flex-col gap-0.5 whitespace-nowrap transition-all duration-150"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: tooltip.color }}
            />
            <span className="text-[9px] text-mute uppercase font-mono font-semibold tracking-wider">
              {tooltip.date}
            </span>
          </div>
          <div className="flex items-baseline gap-1 font-semibold text-ink text-xs">
            <span>{tooltip.value}</span>
            {tooltip.label && (
              <span className="text-[10px] text-mute font-normal font-sans">
                · {tooltip.label}
              </span>
            )}
          </div>
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1.5 h-1.5 bg-canvas-elevated border-r border-b border-hairline rotate-45" />
        </div>
      )}

      {/* Page Header matching standard admin pages */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Operational Intelligence
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Overview Dashboard
          </h1>
          <p className="text-xs text-body mt-1">
            Real-time subscription metrics, cashflow reconciliation, and billing operations.
          </p>
        </div>

        {/* Quick Operational Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/billing"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Process Billing</span>
          </Link>
          <Link
            href="/admin/quotations/new"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink shadow-whisper hover:bg-canvas transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-mute" />
            <span>New Quote</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards with Embedded Graphs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1: Active Subscriptions */}
        <div className="bg-canvas-elevated border border-hairline rounded-md p-4 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium tracking-wider text-mute uppercase font-mono">
                Active Subscriptions
              </span>
              <div className="w-7 h-7 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-white dark:bg-white/10 dark:border-white/20 flex items-center justify-center border border-emerald-500/20">
                <Repeat className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold text-ink tracking-tight font-sans">
                {kpis.activeSubscriptionsCount}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-white bg-emerald-500/10 dark:bg-white/10 dark:border-white/20 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm font-medium">
                live recurring
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-3 pt-2.5 flex items-center justify-between gap-3 border-t border-hairline">
            <div className="flex-1 h-8 relative">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 120 32"
              >
                <defs>
                  <linearGradient id="spark-emerald" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,26 Q20,24 40,18 T80,12 T120,4 L120,32 L0,32 Z"
                  fill="url(#spark-emerald)"
                />
                <path
                  d="M0,26 Q20,24 40,18 T80,12 T120,4"
                  fill="none"
                  stroke="#10b981"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#10b981] stroke-[1.8] hover:r-[4]"
                    cx="4"
                    cy="26"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "2 subs", "#10b981", "subs")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#10b981] stroke-[1.8] hover:r-[4]"
                    cx="40"
                    cy="18"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 10", "2 subs", "#10b981", "subs")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#10b981] stroke-[1.8] hover:r-[4]"
                    cx="80"
                    cy="12"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 20", "3 subs", "#10b981", "subs")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#10b981] stroke-canvas-elevated stroke-[1.5] hover:r-[4.5]"
                    cx="120"
                    cy="4"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(
                        e,
                        "Oct 31",
                        `${kpis.activeSubscriptionsCount} subs`,
                        "#10b981",
                        "subs"
                      )
                    }
                    onMouseLeave={hideTooltip}
                  />
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] font-medium text-emerald-600 dark:text-white bg-emerald-500/10 dark:bg-white/10 dark:border-white/20 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm">
              <ArrowUp className="w-2.5 h-2.5 stroke-[2]" />
              <span>+12.0%</span>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Revenue Received */}
        <div className="bg-canvas-elevated border border-hairline rounded-md p-4 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium tracking-wider text-mute uppercase font-mono">
                Revenue Received
              </span>
              <div className="w-7 h-7 rounded-sm bg-sky-500/10 text-sky-600 dark:text-white dark:bg-white/10 dark:border-white/20 flex items-center justify-center border border-sky-500/20">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold text-ink tracking-tight font-sans">
                {formatCurrency(kpis.revenueReceivedTotal)}
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-3 pt-2.5 flex items-center justify-between gap-3 border-t border-hairline">
            <div className="flex-1 h-8 relative">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 120 32"
              >
                <defs>
                  <linearGradient id="spark-sky" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,28 Q25,22 45,20 T85,10 T120,3 L120,32 L0,32 Z"
                  fill="url(#spark-sky)"
                />
                <path
                  d="M0,28 Q25,22 45,20 T85,10 T120,3"
                  fill="none"
                  stroke="#0284c7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#0284c7] stroke-[1.8] hover:r-[4]"
                    cx="4"
                    cy="28"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "$11,200", "#0284c7", "revenue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#0284c7] stroke-[1.8] hover:r-[4]"
                    cx="45"
                    cy="20"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 10", "$13,400", "#0284c7", "revenue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#0284c7] stroke-[1.8] hover:r-[4]"
                    cx="85"
                    cy="10"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 20", "$15,100", "#0284c7", "revenue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#0284c7] stroke-canvas-elevated stroke-[1.5] hover:r-[4.5]"
                    cx="120"
                    cy="3"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(
                        e,
                        "Oct 31",
                        formatCurrency(kpis.revenueReceivedTotal),
                        "#0284c7",
                        "revenue"
                      )
                    }
                    onMouseLeave={hideTooltip}
                  />
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] font-medium text-sky-600 dark:text-white bg-sky-500/10 dark:bg-white/10 dark:border-white/20 border border-sky-500/20 px-1.5 py-0.5 rounded-sm">
              <ArrowUp className="w-2.5 h-2.5 stroke-[2]" />
              <span>+18.4%</span>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Outstanding Amount */}
        <div className="bg-canvas-elevated border border-hairline rounded-md p-4 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium tracking-wider text-mute uppercase font-mono">
                Outstanding Amount
              </span>
              <div className="w-7 h-7 rounded-sm bg-amber-500/10 text-amber-600 dark:text-white dark:bg-white/10 dark:border-white/20 flex items-center justify-center border border-amber-500/20">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold text-ink tracking-tight font-sans">
                {formatCurrency(kpis.outstandingAmountTotal)}
              </span>
              <span className="text-[10px] font-medium text-amber-600 dark:text-white bg-amber-500/10 dark:bg-white/10 dark:border-white/20 border border-amber-500/20 px-1.5 py-0.5 rounded-sm font-mono">
                unpaid
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-3 pt-2.5 flex items-center justify-between gap-3 border-t border-hairline">
            <div className="flex-1 h-8 relative">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 120 32"
              >
                <defs>
                  <linearGradient id="spark-amber" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,14 Q30,6 55,20 T90,14 T120,16 L120,32 L0,32 Z"
                  fill="url(#spark-amber)"
                />
                <path
                  d="M0,14 Q30,6 55,20 T90,14 T120,16"
                  fill="none"
                  stroke="#d97706"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#d97706] stroke-[1.8] hover:r-[4]"
                    cx="4"
                    cy="14"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "$1,900", "#d97706", "unpaid")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#d97706] stroke-[1.8] hover:r-[4]"
                    cx="45"
                    cy="12"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 10", "$1,650", "#d97706", "unpaid")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#d97706] stroke-[1.8] hover:r-[4]"
                    cx="85"
                    cy="16"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 20", "$1,520", "#d97706", "unpaid")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#d97706] stroke-canvas-elevated stroke-[1.5] hover:r-[4.5]"
                    cx="120"
                    cy="16"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(
                        e,
                        "Oct 31",
                        formatCurrency(kpis.outstandingAmountTotal),
                        "#d97706",
                        "unpaid"
                      )
                    }
                    onMouseLeave={hideTooltip}
                  />
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] font-medium text-amber-600 dark:text-white bg-amber-500/10 dark:bg-white/10 dark:border-white/20 border border-amber-500/20 px-1.5 py-0.5 rounded-sm">
              <Minus className="w-2.5 h-2.5 stroke-[2]" />
              <span>-3.1%</span>
            </div>
          </div>
        </div>

        {/* Metric Card 4: Overdue Invoices (Urgent State) */}
        <div className="bg-canvas-elevated border border-rose-500/30 dark:border-hairline rounded-md p-4 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 dark:bg-white/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium tracking-wider text-rose-600 dark:text-mute uppercase font-mono">
                Overdue Invoices
              </span>
              <div className="w-7 h-7 rounded-sm bg-rose-500/10 text-rose-600 dark:text-white dark:bg-white/10 dark:border-white/20 flex items-center justify-center border border-rose-500/20">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold text-rose-600 dark:text-white tracking-tight font-sans">
                {kpis.overdueInvoicesCount}
              </span>
              <span className="text-xs font-semibold text-rose-600/90 dark:text-white/80 font-mono">
                ({formatCurrency(kpis.overdueAmountTotal)})
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-3 pt-2.5 flex items-center justify-between gap-3 border-t border-rose-500/20 dark:border-hairline">
            <div className="flex-1 h-8 relative">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 120 32"
              >
                <defs>
                  <linearGradient id="spark-rose" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,24 Q30,22 60,18 T90,10 T120,4 L120,32 L0,32 Z"
                  fill="url(#spark-rose)"
                />
                <path
                  d="M0,24 Q30,22 60,18 T90,10 T120,4"
                  fill="none"
                  stroke="#e11d48"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#e11d48] stroke-[1.8] hover:r-[4]"
                    cx="4"
                    cy="24"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "$0", "#e11d48", "overdue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#e11d48] stroke-[1.8] hover:r-[4]"
                    cx="60"
                    cy="18"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 15", "$0", "#e11d48", "overdue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#e11d48] stroke-[1.8] hover:r-[4]"
                    cx="90"
                    cy="10"
                    r="2.5"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 24", "$0", "#e11d48", "overdue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#e11d48] stroke-canvas-elevated stroke-[1.5] hover:r-[4.5]"
                    cx="120"
                    cy="4"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(
                        e,
                        "Oct 31",
                        `${formatCurrency(kpis.overdueAmountTotal)} (${kpis.overdueInvoicesCount} inv)`,
                        "#e11d48",
                        "overdue"
                      )
                    }
                    onMouseLeave={hideTooltip}
                  />
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] font-medium text-rose-600 dark:text-white bg-rose-500/10 dark:bg-white/10 dark:border-white/20 border border-rose-500/20 px-1.5 py-0.5 rounded-sm">
              <ArrowUp className="w-2.5 h-2.5 stroke-[2]" />
              <span>Requires action</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Content Panels Matching Geist standard */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Panel 1: Overdue Invoices */}
        <article className="bg-canvas-elevated border border-hairline rounded-md shadow-whisper overflow-hidden flex flex-col">
          <header className="px-5 py-3.5 border-b border-hairline flex items-center justify-between">
            <h2 className="text-xs font-semibold text-ink tracking-tight">
              Overdue Invoices
            </h2>
            <Link
              href="/admin/invoices?filter=overdue"
              className="text-xs font-mono text-link hover:underline transition-colors"
            >
              View all ({kpis.overdueInvoicesCount})
            </Link>
          </header>
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-start">
            {kpis.overdueInvoices.length === 0 ? (
              <div className="py-6 text-center text-xs text-mute flex flex-col items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-white mb-1.5" />
                <span>All invoices are current. No overdue receivables.</span>
              </div>
            ) : (
              kpis.overdueInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between pb-3 border-b border-hairline last:border-b-0 last:pb-0"
                >
                  <div>
                    <Link
                      href={`/admin/invoices/${inv.id}`}
                      className="text-xs font-semibold text-ink font-mono hover:text-link transition-colors block"
                    >
                      {inv.invoice_number}
                    </Link>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium uppercase font-mono bg-rose-500/10 text-rose-600 dark:bg-white/10 dark:text-white dark:border-white/20 border border-rose-500/20">
                        DUE {inv.due_date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-rose-600 dark:text-white font-mono">
                      {formatCurrency(inv.amount_due)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        {/* Content Panel 2: Active Subscriptions */}
        <article className="bg-canvas-elevated border border-hairline rounded-md shadow-whisper overflow-hidden flex flex-col">
          <header className="px-5 py-3.5 border-b border-hairline flex items-center justify-between">
            <h2 className="text-xs font-semibold text-ink tracking-tight">
              Active Subscriptions
            </h2>
            <Link
              href="/admin/subscriptions"
              className="text-xs font-mono text-link hover:underline transition-colors"
            >
              Manage subs
            </Link>
          </header>
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-start">
            {kpis.upcomingBillingSubscriptions.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between pb-3 border-b border-hairline last:border-b-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/subscriptions/${sub.id}`}
                      className="text-xs font-semibold text-ink font-mono hover:text-link transition-colors"
                    >
                      {sub.subscription_number}
                    </Link>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] uppercase tracking-wider bg-canvas text-mute border border-hairline font-mono font-medium">
                      {sub.billing_frequency}
                    </span>
                  </div>
                  <p className="text-[11px] text-mute font-mono mt-0.5">
                    Next: {sub.next_billing_date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-ink font-mono">
                    {formatCurrency(sub.total_amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Content Panel 3: Recent Subscriptions */}
        <article className="bg-canvas-elevated border border-hairline rounded-md shadow-whisper overflow-hidden flex flex-col">
          <header className="px-5 py-3.5 border-b border-hairline flex items-center justify-between">
            <h2 className="text-xs font-semibold text-ink tracking-tight">
              Recent Subscriptions
            </h2>
            <Link
              href="/admin/subscriptions"
              className="text-xs font-mono text-link hover:underline transition-colors"
            >
              View all
            </Link>
          </header>
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-start">
            {kpis.recentSubscriptions.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between pb-3 border-b border-hairline last:border-b-0 last:pb-0"
              >
                <div>
                  <Link
                    href={`/admin/subscriptions/${sub.id}`}
                    className="text-xs font-semibold text-ink font-mono hover:text-link transition-colors"
                  >
                    {sub.subscription_number}
                  </Link>
                  <p className="text-[11px] text-mute mt-0.5 font-mono">
                    · Started {sub.start_date}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold text-ink font-mono">
                    {formatCurrency(sub.total_amount)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] uppercase font-mono font-medium ${
                      sub.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-white dark:bg-white/10 dark:border-white/20 border border-emerald-500/20"
                        : sub.status === "confirmed"
                        ? "bg-blue-500/10 text-blue-600 dark:text-white dark:bg-white/10 dark:border-white/20 border border-blue-500/20"
                        : "bg-canvas text-mute border border-hairline"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Content Panel 4: Recent Payments Received */}
        <article className="bg-canvas-elevated border border-hairline rounded-md shadow-whisper overflow-hidden flex flex-col">
          <header className="px-5 py-3.5 border-b border-hairline flex items-center justify-between">
            <h2 className="text-xs font-semibold text-ink tracking-tight">
              Recent Payments Received
            </h2>
            <Link
              href="/admin/payments"
              className="text-xs font-mono text-link hover:underline transition-colors"
            >
              View all
            </Link>
          </header>
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-start">
            {kpis.recentPayments.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between pb-3 border-b border-hairline last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-xs font-semibold text-ink font-mono">
                    {p.payment_reference}
                  </p>
                  <p className="text-[11px] text-mute mt-0.5 font-mono">
                    · {p.payment_date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-white font-mono">
                    +{formatCurrency(p.amount)}
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-mute font-mono mt-0.5">
                    {p.payment_method.replace("_", " ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
