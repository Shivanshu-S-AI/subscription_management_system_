import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building,
  CheckCircle,
  Pause,
  Play,
  RotateCcw,
  XCircle,
  FileText,
  Calendar,
  DollarSign,
} from "lucide-react";
import { getSubscriptionById, getStore } from "@/lib/data/store";
import { updateSubStatusAction } from "@/modules/subscriptions/actions";
import { formatCurrency } from "@/lib/utils";

export default async function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sub = getSubscriptionById(id);

  if (!sub) {
    notFound();
  }

  const store = getStore();
  const invoices = store.invoices.filter((inv) => inv.subscription_id === sub.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/subscriptions"
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Subscriptions</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-mute uppercase">CONTRACT LIFECYCLE</span>
            <span
              className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                sub.status === "active"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : sub.status === "confirmed"
                  ? "bg-blue-500/10 text-blue-600"
                  : sub.status === "paused"
                  ? "bg-amber-500/10 text-amber-600"
                  : "bg-canvas text-mute border border-hairline"
              }`}
            >
              {sub.status}
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.4px] text-ink mt-1 font-mono">
            {sub.subscription_number}
          </h1>
          <p className="text-xs text-body mt-1">
            Cadence: <span className="font-semibold text-ink uppercase">{sub.billing_frequency}</span> · Terms: {sub.payment_terms}
          </p>
        </div>

        {/* Lifecycle Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Activate Action */}
          {sub.status === "confirmed" && (
            <form action={async () => {
              "use server";
              await updateSubStatusAction(sub.id, "active");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-emerald-600 px-3 text-xs font-medium text-white shadow-whisper hover:bg-emerald-700 transition-colors"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Activate Subscription</span>
              </button>
            </form>
          )}

          {/* Pause Action (Respects plan rule) */}
          {sub.status === "active" && sub.pause_eligible && (
            <form action={async () => {
              "use server";
              await updateSubStatusAction(sub.id, "paused");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-amber-500/30 bg-amber-500/10 px-3 text-xs font-medium text-amber-700 hover:bg-amber-500/20 transition-colors"
              >
                <Pause className="h-3.5 w-3.5" />
                <span>Pause</span>
              </button>
            </form>
          )}

          {/* Resume Paused */}
          {sub.status === "paused" && (
            <form action={async () => {
              "use server";
              await updateSubStatusAction(sub.id, "active");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white hover:bg-black transition-colors"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Resume Active</span>
              </button>
            </form>
          )}

          {/* Renew Action (Respects plan rule) */}
          {sub.renewal_eligible && sub.status !== "closed" && (
            <form action={async () => {
              "use server";
              await updateSubStatusAction(sub.id, "active");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5 text-mute" />
                <span>Renew Term</span>
              </button>
            </form>
          )}

          {/* Close Early Action (Respects plan rule) */}
          {sub.early_close_eligible && sub.status !== "closed" && (
            <form action={async () => {
              "use server";
              await updateSubStatusAction(sub.id, "closed");
            }}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-error/30 bg-error/5 px-3 text-xs font-medium text-error hover:bg-error/10 transition-colors"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Close Early</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Customer Account
          </span>
          <Link
            href={`/admin/customers/${sub.customer_id}`}
            className="text-base font-semibold text-ink hover:text-link block"
          >
            {sub.customer?.full_name}
          </Link>
          <span className="text-xs text-mute flex items-center gap-1 mt-0.5">
            <Building className="h-3 w-3" />
            {sub.customer?.company_name || sub.customer?.email}
          </span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Assigned Plan & Cadence
          </span>
          <Link
            href={`/admin/plans/${sub.plan_id}`}
            className="text-base font-semibold text-ink hover:text-link block"
          >
            {sub.plan?.name}
          </Link>
          <span className="text-xs text-mute font-mono block mt-0.5">
            Next Billing: {sub.next_billing_date}
          </span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Recurring Billing Amount
          </span>
          <span className="text-2xl font-semibold text-ink font-mono block">
            {formatCurrency(sub.total_amount)}
          </span>
          <span className="text-[11px] text-mute block mt-0.5">
            Billed {sub.billing_frequency}
          </span>
        </div>
      </div>

      {/* Subscribed Product Lines Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="p-4 border-b border-hairline bg-canvas">
          <h2 className="text-xs font-mono uppercase tracking-wider text-mute">
            Subscribed Product Lines
          </h2>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas/50 border-b border-hairline text-[11px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium text-center">Qty</th>
              <th className="px-5 py-3 font-medium text-right">Base Price</th>
              <th className="px-5 py-3 font-medium text-right">Variant Adjustment</th>
              <th className="px-5 py-3 font-medium text-right">Tax (%)</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {sub.lines.map((l) => (
              <tr key={l.id}>
                <td className="px-5 py-3.5 font-medium text-ink">{l.description}</td>
                <td className="px-5 py-3.5 font-mono text-center">{l.quantity}</td>
                <td className="px-5 py-3.5 font-mono text-right">{formatCurrency(l.unit_price)}</td>
                <td className="px-5 py-3.5 font-mono text-right text-emerald-600">
                  +{formatCurrency(l.variant_adjustment)}
                </td>
                <td className="px-5 py-3.5 font-mono text-right text-mute">{l.tax_rate}%</td>
                <td className="px-5 py-3.5 font-mono font-semibold text-ink text-right">
                  {formatCurrency(l.line_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Associated Invoices Section */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-ink" />
            <h2 className="text-sm font-semibold text-ink">
              Billing History & Issued Invoices ({invoices.length})
            </h2>
          </div>
          <Link
            href="/admin/billing"
            className="text-xs font-mono text-link hover:underline"
          >
            Trigger Billing Run →
          </Link>
        </div>

        {invoices.length === 0 ? (
          <p className="text-xs text-mute py-4 text-center">
            No invoices processed for this subscription yet.
          </p>
        ) : (
          <div className="divide-y divide-hairline-soft">
            {invoices.map((inv) => (
              <div key={inv.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="font-mono font-semibold text-ink hover:text-link"
                  >
                    {inv.invoice_number}
                  </Link>
                  <span className="text-mute block text-[11px] mt-0.5">
                    Period: {inv.billing_period_start} → {inv.billing_period_end} · Due {inv.due_date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-semibold text-ink block">{formatCurrency(inv.total_amount)}</span>
                    {inv.amount_due > 0 && (
                      <span className="text-[10px] font-mono text-error block">
                        Unpaid: {formatCurrency(inv.amount_due)}
                      </span>
                    )}
                  </div>
                  <span
                    className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                      inv.status === "paid"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : inv.status === "confirmed"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-canvas text-mute border border-hairline"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

