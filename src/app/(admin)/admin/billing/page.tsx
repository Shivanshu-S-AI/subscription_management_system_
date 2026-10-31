import Link from "next/link";
import { Receipt, Play, CheckCircle, ShieldCheck, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { getStore } from "@/lib/data/store";
import { runBillingAction } from "@/modules/billing/actions";
import { formatCurrency } from "@/lib/utils";

export default async function RecurringBillingPage() {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  const dueSubscriptions = store.subscriptions.filter((s) => s.status === "active");
  const processedInvoices = store.invoices.filter((inv) => inv.subscription_id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Finance & Automation
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Recurring Billing Engine
          </h1>
          <p className="text-xs text-body mt-1">
            Automated billing schedule executor with strict transactional idempotency.
          </p>
        </div>

        {/* Process Billing Action Button */}
        <form action={runBillingAction}>
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-2 rounded-sm bg-ink px-4 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Execute Billing Run</span>
          </button>
        </form>
      </div>

      {/* Idempotency & Safety Banner */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-ink block">
            Automated Duplicate Prevention Guarantee
          </span>
          <p className="text-body mt-0.5 leading-relaxed">
            Every billing cycle is guarded by composite unique constraints (<code className="font-mono bg-canvas px-1 py-0.5 rounded border border-hairline">subscription_id + billing_period_start + billing_period_end</code>). Running this process multiple times will never duplicate invoices or miss due accounts.
          </p>
        </div>
      </div>

      {/* Grid: Subscriptions Due vs Recently Processed Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Due Subscriptions */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
          <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-ink" />
              <h2 className="text-sm font-semibold text-ink">
                Active Subscriptions in Billing Schedule
              </h2>
            </div>
            <span className="font-mono text-xs text-mute">{dueSubscriptions.length} active</span>
          </div>

          <div className="divide-y divide-hairline-soft">
            {dueSubscriptions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/subscriptions/${sub.id}`}
                    className="font-mono font-semibold text-ink hover:text-link"
                  >
                    {sub.subscription_number}
                  </Link>
                  <span className="text-mute block text-[11px] mt-0.5">
                    {sub.customer?.full_name} · Cadence: {sub.billing_frequency.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-ink block">
                    {formatCurrency(sub.total_amount)}
                  </span>
                  <span className="font-mono text-[10px] text-mute block mt-0.5">
                    Next Run: {sub.next_billing_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Processed Recurring Invoices */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
          <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-ink">
                Recently Processed Billing Invoices
              </h2>
            </div>
            <Link
              href="/admin/invoices"
              className="text-xs font-mono text-link hover:underline"
            >
              All Invoices →
            </Link>
          </div>

          <div className="divide-y divide-hairline-soft">
            {processedInvoices.slice(0, 5).map((inv) => (
              <div key={inv.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="font-mono font-semibold text-ink hover:text-link"
                  >
                    {inv.invoice_number}
                  </Link>
                  <span className="text-mute block text-[11px] mt-0.5">
                    Period: {inv.billing_period_start} → {inv.billing_period_end}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-semibold text-ink block">
                      {formatCurrency(inv.total_amount)}
                    </span>
                    <span className="text-[10px] font-mono text-mute block">
                      {inv.status.toUpperCase()}
                    </span>
                  </div>
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="p-1 rounded-sm border border-hairline hover:bg-canvas"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-mute" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

