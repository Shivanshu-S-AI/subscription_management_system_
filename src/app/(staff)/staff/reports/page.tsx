import Link from "next/link";
import {
  BarChart3,
  Repeat,
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Receipt,
  CreditCard,
  Users,
} from "lucide-react";
import { getStore, getCustomers } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function StaffReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ customer_id?: string; status?: string }>;
}) {
  const { customer_id, status } = await searchParams;
  const store = getStore();
  const customers = getCustomers();
  const today = new Date().toISOString().split("T")[0];

  // Filter invoices
  let invoices = store.invoices.filter((i) => i.status !== "cancelled");
  if (customer_id) {
    invoices = invoices.filter((i) => i.customer_id === customer_id);
  }
  if (status) {
    if (status === "overdue") {
      invoices = invoices.filter(
        (i) => i.due_date < today && Number(i.amount_due) > 0 && i.status !== "paid"
      );
    } else if (status === "outstanding") {
      invoices = invoices.filter((i) => Number(i.amount_due) > 0 && i.status !== "paid");
    } else {
      invoices = invoices.filter((i) => i.status === status);
    }
  }

  // Summary figures
  const activeSubs = store.subscriptions.filter(
    (s) => s.status === "active" || s.status === "confirmed"
  );
  const revenueReceived = store.payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const outstandingInvoices = store.invoices.filter(
    (i) => i.status !== "paid" && i.status !== "cancelled"
  );
  const totalOutstanding = outstandingInvoices.reduce((sum, i) => sum + Number(i.amount_due), 0);
  const overdueInvoices = outstandingInvoices.filter((i) => i.due_date < today);
  const totalOverdue = overdueInvoices.reduce((sum, i) => sum + Number(i.amount_due), 0);

  // Aging Buckets for Collections
  const aging = {
    current: 0,
    days1_30: 0,
    days31_60: 0,
    days61_plus: 0,
  };

  outstandingInvoices.forEach((inv) => {
    const dueTime = new Date(inv.due_date).getTime();
    const nowTime = new Date().getTime();
    const diffDays = Math.floor((nowTime - dueTime) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      aging.current += Number(inv.amount_due);
    } else if (diffDays <= 30) {
      aging.days1_30 += Number(inv.amount_due);
    } else if (diffDays <= 60) {
      aging.days31_60 += Number(inv.amount_due);
    } else {
      aging.days61_plus += Number(inv.amount_due);
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-hairline pb-5">
        <span className="font-mono text-xs uppercase tracking-wider text-mute">
          Operational Reporting
        </span>
        <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
          Collections & Operational Audit
        </h1>
        <p className="text-xs text-body mt-1">
          Monitor accounts receivable, identify overdue customer invoices, and track cash receipts.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block">
            Active Subscriptions
          </span>
          <span className="text-2xl font-semibold text-ink mt-2 block">
            {activeSubs.length}
          </span>
          <span className="text-[11px] text-mute mt-1 block">Contracts currently generating billing</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block">
            Revenue Received
          </span>
          <span className="text-2xl font-semibold text-emerald-600 mt-2 block">
            ${revenueReceived.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-mute mt-1 block">Total completed payment receipts</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block">
            Outstanding Receivables
          </span>
          <span className="text-2xl font-semibold text-ink mt-2 block">
            ${totalOutstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-mute mt-1 block">
            {outstandingInvoices.length} uncollected invoices
          </span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block">
            Overdue Balance
          </span>
          <span className="text-2xl font-semibold text-red-600 mt-2 block">
            ${totalOverdue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-red-600 font-medium mt-1 block">
            {overdueInvoices.length} past due invoices to chase
          </span>
        </div>
      </div>

      {/* Accounts Receivable Aging Schedule */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper space-y-4">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink">
              Accounts Receivable Aging Analysis
            </h2>
            <p className="text-[11px] text-mute mt-0.5">
              Breakdown of outstanding invoices by collection age.
            </p>
          </div>
          <span className="font-mono text-xs font-semibold text-ink">
            Total: ${totalOutstanding.toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="font-mono text-[10px] uppercase text-mute block">Current (Not Due)</span>
            <span className="font-mono text-base font-bold text-ink mt-1 block">
              ${aging.current.toFixed(2)}
            </span>
          </div>

          <div className="p-3 rounded-sm bg-amber-50/50 border border-amber-200/50">
            <span className="font-mono text-[10px] uppercase text-amber-800 block">1–30 Days Overdue</span>
            <span className="font-mono text-base font-bold text-amber-700 mt-1 block">
              ${aging.days1_30.toFixed(2)}
            </span>
          </div>

          <div className="p-3 rounded-sm bg-orange-50/50 border border-orange-200/50">
            <span className="font-mono text-[10px] uppercase text-orange-800 block">31–60 Days Overdue</span>
            <span className="font-mono text-base font-bold text-orange-700 mt-1 block">
              ${aging.days31_60.toFixed(2)}
            </span>
          </div>

          <div className="p-3 rounded-sm bg-red-50/50 border border-red-200/50">
            <span className="font-mono text-[10px] uppercase text-red-800 block">60+ Days Overdue</span>
            <span className="font-mono text-base font-bold text-red-600 mt-1 block">
              ${aging.days61_plus.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Filterable Collections Queue */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink">
              Invoice Collections Queue
            </h2>
            <p className="text-[11px] text-mute">
              Filter invoices to chase pending and overdue collections.
            </p>
          </div>

          {/* Filter Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href="/staff/reports"
              className={`px-2.5 py-1 rounded-sm border ${
                !status ? "bg-ink text-white border-ink" : "bg-canvas-elevated text-body border-hairline hover:text-ink"
              }`}
            >
              All Invoices
            </Link>
            <Link
              href="/staff/reports?status=overdue"
              className={`px-2.5 py-1 rounded-sm border ${
                status === "overdue" ? "bg-red-600 text-white border-red-600" : "bg-canvas-elevated text-red-600 border-red-200 hover:bg-red-50"
              }`}
            >
              Overdue Only
            </Link>
            <Link
              href="/staff/reports?status=outstanding"
              className={`px-2.5 py-1 rounded-sm border ${
                status === "outstanding" ? "bg-ink text-white border-ink" : "bg-canvas-elevated text-body border-hairline hover:text-ink"
              }`}
            >
              Outstanding Only
            </Link>
          </div>
        </div>

        {/* Invoices List Table */}
        <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
                <tr>
                  <th className="px-5 py-3 font-medium">Invoice #</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Invoiced</th>
                  <th className="px-5 py-3 font-medium text-right">Paid</th>
                  <th className="px-5 py-3 font-medium text-right">Balance Due</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-mute">
                      No invoices found matching the current filters.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => {
                    const isOverdue =
                      inv.amount_due > 0 &&
                      inv.due_date < today &&
                      inv.status !== "cancelled" &&
                      inv.status !== "paid";

                    return (
                      <tr key={inv.id} className="hover:bg-canvas/50 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-medium text-ink">
                          <Link
                            href={`/staff/invoices/${inv.id}`}
                            className="hover:underline font-semibold"
                          >
                            {inv.invoice_number}
                          </Link>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-medium text-ink">
                            {inv.customer?.company_name || inv.customer?.full_name}
                          </div>
                          <div className="font-mono text-[10px] text-mute">{inv.customer?.email}</div>
                        </td>
                        <td className="px-5 py-3.5 font-mono">
                          <span className={isOverdue ? "text-red-600 font-bold" : "text-mute"}>
                            {inv.due_date}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                              inv.status === "paid"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : inv.status === "confirmed"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-zinc-100 text-zinc-700 border-zinc-200"
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono">
                          ${inv.total_amount.toFixed(2)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono text-emerald-600">
                          ${inv.amount_paid.toFixed(2)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono font-bold">
                          <span className={inv.amount_due > 0 ? "text-red-600" : "text-mute"}>
                            ${inv.amount_due.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Link
                            href={`/staff/invoices/${inv.id}`}
                            className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2 py-0.5 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                          >
                            <span>Manage</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
