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
      y: rect.top - 8,
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
    <div className="space-y-8">
      {/* Global Floating Tooltip for Sparkline dots */}
      {tooltip.visible && (
        <div
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
          className="pointer-events-none fixed z-50 transform -translate-x-1/2 -translate-y-full mb-2 bg-canvas-elevated text-ink rounded-lg px-2.5 py-1.5 shadow-floating border border-hairline text-xs font-mono tracking-tight flex flex-col gap-0.5 whitespace-nowrap transition-all duration-150"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: tooltip.color }}
            />
            <span className="text-[10px] text-mute uppercase font-sans font-semibold tracking-wider">
              {tooltip.date}
            </span>
          </div>
          <div className="flex items-baseline gap-1 font-bold text-ink text-xs">
            <span>{tooltip.value}</span>
            {tooltip.label && (
              <span className="text-[10px] text-mute font-normal">
                · {tooltip.label}
              </span>
            )}
          </div>
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-canvas-elevated border-r border-b border-hairline rotate-45" />
        </div>
      )}

      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Overview Dashboard
          </h1>
        </div>

        {/* Quick Operational Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <Link
            href="/admin/billing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink text-white hover:bg-black text-sm font-semibold transition-all shadow-whisper cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Process Billing</span>
          </Link>
          <Link
            href="/admin/quotations/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-canvas-elevated hover:bg-canvas text-ink text-sm font-semibold border border-hairline transition-all shadow-whisper cursor-pointer"
          >
            <Plus className="w-4 h-4 text-mute" />
            <span>New Quote</span>
          </Link>
        </div>
      </section>

      {/* 4 Primary KPI Cards with Embedded Graphs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Metric Card 1: Active Subscriptions */}
        <div className="bg-canvas-elevated border border-hairline rounded-2xl p-5 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-wider text-mute uppercase font-mono">
                Active Subscriptions
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <Repeat className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight font-sans">
                {kpis.activeSubscriptionsCount}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                live recurring
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-hairline">
            <div className="flex-1 h-9 relative">
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
                  strokeWidth="2"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#10b981] stroke-[2] hover:r-[4.5]"
                    cx="4"
                    cy="26"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "2 subs", "#10b981", "subs")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#10b981] stroke-[2] hover:r-[4.5]"
                    cx="40"
                    cy="18"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 10", "2 subs", "#10b981", "subs")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#10b981] stroke-[2] hover:r-[4.5]"
                    cx="80"
                    cy="12"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 20", "3 subs", "#10b981", "subs")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#10b981] stroke-canvas-elevated stroke-[1.5] hover:r-[5]"
                    cx="120"
                    cy="4"
                    r="3.5"
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
            <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              <span>+12.0%</span>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Revenue Received */}
        <div className="bg-canvas-elevated border border-hairline rounded-2xl p-5 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-wider text-mute uppercase font-mono">
                Revenue Received
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:scale-105 transition-transform">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight font-sans">
                {formatCurrency(kpis.revenueReceivedTotal)}
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-hairline">
            <div className="flex-1 h-9 relative">
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
                  strokeWidth="2"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#0284c7] stroke-[2] hover:r-[4.5]"
                    cx="4"
                    cy="28"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "$11,200", "#0284c7", "revenue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#0284c7] stroke-[2] hover:r-[4.5]"
                    cx="45"
                    cy="20"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 10", "$13,400", "#0284c7", "revenue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#0284c7] stroke-[2] hover:r-[4.5]"
                    cx="85"
                    cy="10"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 20", "$15,100", "#0284c7", "revenue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#0284c7] stroke-canvas-elevated stroke-[1.5] hover:r-[5]"
                    cx="120"
                    cy="3"
                    r="3.5"
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
            <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              <span>+18.4%</span>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Outstanding Amount */}
        <div className="bg-canvas-elevated border border-hairline rounded-2xl p-5 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-wider text-mute uppercase font-mono">
                Outstanding Amount
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight font-sans">
                {formatCurrency(kpis.outstandingAmountTotal)}
              </span>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
                unpaid
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-hairline">
            <div className="flex-1 h-9 relative">
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
                  strokeWidth="2"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#d97706] stroke-[2] hover:r-[4.5]"
                    cx="4"
                    cy="14"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "$1,900", "#d97706", "unpaid")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#d97706] stroke-[2] hover:r-[4.5]"
                    cx="45"
                    cy="12"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 10", "$1,650", "#d97706", "unpaid")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#d97706] stroke-[2] hover:r-[4.5]"
                    cx="85"
                    cy="16"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 20", "$1,520", "#d97706", "unpaid")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#d97706] stroke-canvas-elevated stroke-[1.5] hover:r-[5]"
                    cx="120"
                    cy="16"
                    r="3.5"
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
            <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              <Minus className="w-3 h-3 stroke-[2.5]" />
              <span>-3.1%</span>
            </div>
          </div>
        </div>

        {/* Metric Card 4: Overdue Invoices (Urgent State) */}
        <div className="bg-canvas-elevated border border-rose-500/30 rounded-2xl p-5 shadow-whisper hover:shadow-floating transition-all flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-wider text-rose-600 dark:text-rose-400 uppercase font-mono">
                Overdue Invoices
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight font-sans">
                {kpis.overdueInvoicesCount}
              </span>
              <span className="text-base sm:text-lg font-bold text-rose-600/90 dark:text-rose-400 font-mono">
                ({formatCurrency(kpis.overdueAmountTotal)})
              </span>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-rose-500/20">
            <div className="flex-1 h-9 relative">
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
                  strokeWidth="2"
                />
                <g className="spark-points">
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#e11d48] stroke-[2] hover:r-[4.5]"
                    cx="4"
                    cy="24"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 01", "$0", "#e11d48", "overdue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#e11d48] stroke-[2] hover:r-[4.5]"
                    cx="60"
                    cy="18"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 15", "$0", "#e11d48", "overdue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-canvas-elevated stroke-[#e11d48] stroke-[2] hover:r-[4.5]"
                    cx="90"
                    cy="10"
                    r="3"
                    onMouseEnter={(e) =>
                      showTooltip(e, "Oct 24", "$0", "#e11d48", "overdue")
                    }
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    className="spark-dot transition-all duration-150 cursor-pointer fill-[#e11d48] stroke-canvas-elevated stroke-[1.5] hover:r-[5]"
                    cx="120"
                    cy="4"
                    r="3.5"
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
            <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              <span>Requires action</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Content Panels Matching screen.png */}
      <section className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-6">
        {/* Content Panel 1: Overdue Invoices */}
        <article className="bg-canvas-elevated border border-hairline rounded-2xl shadow-whisper overflow-hidden flex flex-col h-full transition-all hover:border-hairline/90">
          <header className="px-6 py-4 border-b border-hairline flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-ink tracking-tight">
              Overdue Invoices
            </h2>
            <Link
              href="/admin/invoices?filter=overdue"
              className="text-xs font-semibold text-link hover:underline transition-colors"
            >
              View all ({kpis.overdueInvoicesCount})
            </Link>
          </header>
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-start">
            {kpis.overdueInvoices.length === 0 ? (
              <div className="py-8 text-center text-xs text-mute flex flex-col items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-500 mb-2" />
                <span>All invoices are current. No overdue receivables.</span>
              </div>
            ) : (
              kpis.overdueInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between pb-3.5 border-b border-hairline last:border-b-0 last:pb-0"
                >
                  <div>
                    <Link
                      href={`/admin/invoices/${inv.id}`}
                      className="text-sm font-bold text-ink font-mono hover:text-link transition-colors block"
                    >
                      {inv.invoice_number}
                    </Link>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-mono">
                        DUE {inv.due_date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400 font-mono tracking-tight">
                      {formatCurrency(inv.amount_due)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        {/* Content Panel 2: Active Subscriptions */}
        <article className="bg-canvas-elevated border border-hairline rounded-2xl shadow-whisper overflow-hidden flex flex-col h-full transition-all hover:border-hairline/90">
          <header className="px-6 py-4 border-b border-hairline flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-ink tracking-tight">
              Active Subscriptions
            </h2>
            <Link
              href="/admin/subscriptions"
              className="text-xs font-semibold text-link hover:underline transition-colors"
            >
              Manage subs
            </Link>
          </header>
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-start">
            {kpis.upcomingBillingSubscriptions.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between pb-3.5 border-b border-hairline last:border-b-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/subscriptions/${sub.id}`}
                      className="text-sm font-bold text-ink font-mono hover:text-link transition-colors"
                    >
                      {sub.subscription_number}
                    </Link>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-canvas text-mute border border-hairline font-mono">
                      {sub.billing_frequency}
                    </span>
                  </div>
                  <p className="text-xs text-mute font-mono mt-0.5">
                    Next: {sub.next_billing_date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-ink font-mono">
                    {formatCurrency(sub.total_amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Content Panel 3: Recent Subscriptions */}
        <article className="bg-canvas-elevated border border-hairline rounded-2xl shadow-whisper overflow-hidden flex flex-col h-full transition-all hover:border-hairline/90">
          <header className="px-6 py-4 border-b border-hairline flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-ink tracking-tight">
              Recent Subscriptions
            </h2>
            <Link
              href="/admin/subscriptions"
              className="text-xs font-semibold text-link hover:underline transition-colors"
            >
              View all
            </Link>
          </header>
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-start">
            {kpis.recentSubscriptions.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between pb-3.5 border-b border-hairline last:border-b-0 last:pb-0"
              >
                <div>
                  <Link
                    href={`/admin/subscriptions/${sub.id}`}
                    className="text-sm font-bold text-ink font-mono hover:text-link transition-colors"
                  >
                    {sub.subscription_number}
                  </Link>
                  <p className="text-xs text-mute font-medium mt-0.5 font-mono">
                    · Started {sub.start_date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-ink font-mono">
                    {formatCurrency(sub.total_amount)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase font-mono ${
                      sub.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : sub.status === "confirmed"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
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
        <article className="bg-canvas-elevated border border-hairline rounded-2xl shadow-whisper overflow-hidden flex flex-col h-full transition-all hover:border-hairline/90">
          <header className="px-6 py-4 border-b border-hairline flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-ink tracking-tight">
              Recent Payments Received
            </h2>
            <Link
              href="/admin/payments"
              className="text-xs font-semibold text-link hover:underline transition-colors"
            >
              View all
            </Link>
          </header>
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-start">
            {kpis.recentPayments.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between pb-3.5 border-b border-hairline last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-bold text-ink font-mono">
                    {p.payment_reference}
                  </p>
                  <p className="text-xs text-mute font-medium mt-0.5 font-mono">
                    · {p.payment_date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    +{formatCurrency(p.amount)}
                  </span>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-mute font-mono mt-0.5">
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
