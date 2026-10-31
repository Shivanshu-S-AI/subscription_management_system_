import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Pause,
  Play,
  RotateCcw,
  Receipt,
  ArrowUpRight,
  Shield,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import {
  getCustomerForUser,
  getCustomerSubscriptionById,
  getStore,
} from "@/lib/data/store";
import {
  customerPauseAction,
  customerResumeAction,
  customerRenewAction,
} from "@/modules/portal/actions";

export const dynamic = "force-dynamic";

export default async function CustomerSubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await getCurrentUser();
  const customer = getCustomerForUser(user?.id || user?.email || "");

  if (!customer) {
    notFound();
  }

  // Strict customer-level data isolation: Returns null if subscription does not belong to this customer
  const sub = getCustomerSubscriptionById(customer.id, id);
  if (!sub) {
    notFound();
  }

  const store = getStore();
  // Strictly filter invoices belonging to this customer and this subscription
  const invoices = store.invoices.filter(
    (inv) => inv.customer_id === customer.id && inv.subscription_id === sub.id
  );

  const plan = sub.plan;
  const canPause = plan ? plan.pause_eligible : false;
  const canRenew = plan ? plan.renewal_eligible : true;

  // Actions
  const pauseSub = customerPauseAction.bind(null, sub.id);
  const resumeSub = customerResumeAction.bind(null, sub.id);
  const renewSub = customerRenewAction.bind(null, sub.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/portal/subscriptions"
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to My Subscriptions</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-mute uppercase">SUBSCRIPTION SERVICE</span>
            <span
              className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                sub.status === "active"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  : sub.status === "confirmed"
                  ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                  : sub.status === "paused"
                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
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
            Service Tier: <span className="font-semibold text-ink">{sub.plan?.name}</span> · Frequency:{" "}
            <span className="capitalize font-mono text-ink">{sub.billing_frequency}</span>
          </p>
        </div>

        {/* Self-Service Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {sub.status === "active" && canPause && (
            <form action={pauseSub}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
              >
                <Pause className="h-3.5 w-3.5 text-mute" />
                <span>Pause Subscription</span>
              </button>
            </form>
          )}

          {sub.status === "paused" && (
            <form action={resumeSub}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-emerald-600 px-3 text-xs font-medium text-white shadow-whisper hover:bg-emerald-700 transition-colors"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Resume Subscription</span>
              </button>
            </form>
          )}

          {canRenew && sub.status !== "closed" && (
            <form action={renewSub}>
              <button
                type="submit"
                className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
              >
                <RotateCcw className="h-3.5 w-3.5 text-mute" />
                <span>Renew Contract</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Grid: Subscription Schedule & Terms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Contract Lifecycle Schedule
          </span>
          <div className="flex justify-between text-xs">
            <span className="text-mute">Start Date:</span>
            <span className="font-mono font-medium text-ink">{sub.start_date}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-mute">Current Term Expiry:</span>
            <span className="font-mono font-medium text-ink">{sub.expiry_date || "Continuous auto-renewal"}</span>
          </div>
          <div className="flex justify-between text-xs pt-1 border-t border-hairline-soft">
            <span className="text-mute">Next Billing Run:</span>
            <span className="font-mono font-semibold text-ink">{sub.next_billing_date || "—"}</span>
          </div>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-2">
            Plan Policy & Terms
          </span>
          <div className="flex justify-between text-xs">
            <span className="text-mute">Billing Frequency:</span>
            <span className="capitalize font-mono font-medium text-ink">{sub.billing_frequency}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-mute">Payment Terms:</span>
            <span className="font-mono font-medium text-ink">{sub.payment_terms}</span>
          </div>
          <div className="flex justify-between text-xs pt-1 border-t border-hairline-soft">
            <span className="text-mute">Self-Service Pause:</span>
            <span className="font-mono text-ink">{canPause ? "Allowed" : "Plan Restricted"}</span>
          </div>
        </div>
      </div>

      {/* Contracted Products & Services */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider">
            Included Software Products & Add-ons
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-2.5">Product</th>
              <th className="px-5 py-2.5 text-right">Quantity</th>
              <th className="px-5 py-2.5 text-right">Unit Price</th>
              <th className="px-5 py-2.5 text-right">Tax Rate</th>
              <th className="px-5 py-2.5 text-right">Recurring Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {sub.lines.map((line) => (
              <tr key={line.id} className="hover:bg-canvas/50">
                <td className="px-5 py-4">
                  <span className="font-medium text-ink block">{line.description}</span>
                  {line.variant_adjustment > 0 && (
                    <span className="font-mono text-[10px] text-emerald-600 block mt-0.5">
                      Variant Adjustment: +${line.variant_adjustment.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right font-mono font-medium">
                  {line.quantity}
                </td>
                <td className="px-5 py-4 text-right font-mono">
                  ${line.unit_price.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-mute">
                  {line.tax_rate}%
                </td>
                <td className="px-5 py-4 text-right font-mono font-semibold text-ink">
                  ${line.line_total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-hairline bg-canvas p-4 text-right">
          <span className="text-xs text-body mr-3">Recurring Periodic Total:</span>
          <span className="font-mono text-base font-bold text-ink">
            ${sub.total_amount.toFixed(2)} / {sub.billing_frequency}
          </span>
        </div>
      </div>

      {/* Associated Invoices */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
          <h3 className="font-semibold text-xs text-ink uppercase font-mono tracking-wider flex items-center gap-2">
            <Receipt className="h-4 w-4 text-mute" />
            <span>Billing Invoices for this Subscription ({invoices.length})</span>
          </h3>
        </div>
        {invoices.length === 0 ? (
          <div className="p-6 text-center text-xs text-mute">
            No invoices generated yet for this subscription.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-2.5">Invoice #</th>
                <th className="px-5 py-2.5">Issue Date</th>
                <th className="px-5 py-2.5">Due Date</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5 text-right">Total</th>
                <th className="px-5 py-2.5 text-right">Amount Due</th>
                <th className="px-5 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-canvas/50">
                  <td className="px-5 py-3 font-mono font-semibold text-ink">
                    {inv.invoice_number}
                  </td>
                  <td className="px-5 py-3 font-mono text-mute">{inv.issue_date}</td>
                  <td className="px-5 py-3 font-mono text-mute">{inv.due_date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                        inv.status === "paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-medium">
                    ${inv.total_amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-bold">
                    <span className={inv.amount_due > 0 ? "text-red-600" : "text-mute"}>
                      ${inv.amount_due.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/portal/invoices/${inv.id}`}
                      className="text-link hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
