import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  ArrowUpRight,
  Repeat,
  FileText,
  CreditCard,
  Plus,
  Receipt,
} from "lucide-react";
import { getCustomerById } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function StaffCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const totalSpent = customer.payments.reduce((acc, p) => acc + Number(p.amount), 0);
  const totalOutstanding = customer.invoices
    .filter((inv) => inv.status !== "paid" && inv.status !== "cancelled")
    .reduce((acc, inv) => acc + Number(inv.amount_due), 0);

  return (
    <div className="space-y-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/staff/customers"
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Customers</span>
        </Link>
      </div>

      {/* Customer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-canvas px-1.5 py-0.5 font-mono text-[10px] uppercase text-mute border border-hairline">
              CUSTOMER ACCOUNT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.4px] text-ink mt-1">
            {customer.full_name}
          </h1>
          {customer.company_name && (
            <p className="text-sm text-body flex items-center gap-1.5 mt-0.5">
              <Building className="h-4 w-4 text-mute" />
              <span>{customer.company_name}</span>
            </p>
          )}
        </div>

        {/* Quick action button for staff */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/staff/quotations/new?customer_id=${customer.id}`}
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Quotation</span>
          </Link>
        </div>
      </div>

      {/* Overview Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute block">
            Total Spent
          </span>
          <span className="text-xl font-semibold text-ink mt-1 block">
            ${totalSpent.toFixed(2)}
          </span>
          <span className="text-[11px] text-mute mt-0.5 block">Lifetime payments</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute block">
            Outstanding Due
          </span>
          <span className={`text-xl font-semibold mt-1 block ${totalOutstanding > 0 ? "text-red-600" : "text-ink"}`}>
            ${totalOutstanding.toFixed(2)}
          </span>
          <span className="text-[11px] text-mute mt-0.5 block">Unsettled invoices</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute block">
            Subscriptions
          </span>
          <span className="text-xl font-semibold text-ink mt-1 block">
            {customer.subscriptions.length}
          </span>
          <span className="text-[11px] text-mute mt-0.5 block">
            {customer.subscriptions.filter((s) => s.status === "active").length} currently active
          </span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute block">
            Quotations
          </span>
          <span className="text-xl font-semibold text-ink mt-1 block">
            {customer.quotations.length}
          </span>
          <span className="text-[11px] text-mute mt-0.5 block">Sales proposals</span>
        </div>
      </div>

      {/* Cross-Module Sections */}
      <div className="space-y-8">
        {/* Subscriptions */}
        <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
          <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
            <h3 className="font-semibold text-xs tracking-tight text-ink flex items-center gap-2">
              <Repeat className="h-4 w-4 text-mute" />
              <span>Subscriptions ({customer.subscriptions.length})</span>
            </h3>
          </div>
          {customer.subscriptions.length === 0 ? (
            <div className="p-6 text-center text-xs text-mute">No subscriptions on file.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
                <tr>
                  <th className="px-5 py-2.5">Sub #</th>
                  <th className="px-5 py-2.5">Plan</th>
                  <th className="px-5 py-2.5">Frequency</th>
                  <th className="px-5 py-2.5">Status</th>
                  <th className="px-5 py-2.5 text-right">Amount</th>
                  <th className="px-5 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {customer.subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-canvas/50">
                    <td className="px-5 py-3 font-mono font-medium text-ink">
                      {sub.subscription_number}
                    </td>
                    <td className="px-5 py-3">{sub.plan?.name}</td>
                    <td className="px-5 py-3 capitalize">{sub.billing_frequency}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-canvas border border-hairline text-ink">
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono font-medium">
                      ${sub.total_amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/staff/subscriptions/${sub.id}`}
                        className="text-link hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quotations */}
        <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
          <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
            <h3 className="font-semibold text-xs tracking-tight text-ink flex items-center gap-2">
              <FileText className="h-4 w-4 text-mute" />
              <span>Quotations ({customer.quotations.length})</span>
            </h3>
            <Link
              href={`/staff/quotations/new?customer_id=${customer.id}`}
              className="text-xs text-ink hover:underline font-medium flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>New Quote</span>
            </Link>
          </div>
          {customer.quotations.length === 0 ? (
            <div className="p-6 text-center text-xs text-mute">No quotations created yet.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
                <tr>
                  <th className="px-5 py-2.5">Quote #</th>
                  <th className="px-5 py-2.5">Valid Until</th>
                  <th className="px-5 py-2.5">Status</th>
                  <th className="px-5 py-2.5 text-right">Total</th>
                  <th className="px-5 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {customer.quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-canvas/50">
                    <td className="px-5 py-3 font-mono font-medium text-ink">
                      {q.quote_number}
                    </td>
                    <td className="px-5 py-3">{q.valid_until}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-canvas border border-hairline text-ink">
                        {q.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono font-medium">
                      ${q.total_amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/staff/quotations/${q.id}`}
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

        {/* Invoices */}
        <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
          <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
            <h3 className="font-semibold text-xs tracking-tight text-ink flex items-center gap-2">
              <Receipt className="h-4 w-4 text-mute" />
              <span>Invoices ({customer.invoices.length})</span>
            </h3>
          </div>
          {customer.invoices.length === 0 ? (
            <div className="p-6 text-center text-xs text-mute">No invoices issued.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
                <tr>
                  <th className="px-5 py-2.5">Invoice #</th>
                  <th className="px-5 py-2.5">Due Date</th>
                  <th className="px-5 py-2.5">Status</th>
                  <th className="px-5 py-2.5 text-right">Total</th>
                  <th className="px-5 py-2.5 text-right">Balance Due</th>
                  <th className="px-5 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {customer.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-canvas/50">
                    <td className="px-5 py-3 font-mono font-medium text-ink">
                      {inv.invoice_number}
                    </td>
                    <td className="px-5 py-3">{inv.due_date}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-canvas border border-hairline text-ink">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono">
                      ${inv.total_amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right font-mono font-medium text-red-600">
                      ${inv.amount_due.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/staff/invoices/${inv.id}`}
                        className="text-link hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>Manage</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Payments */}
        <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
          <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between">
            <h3 className="font-semibold text-xs tracking-tight text-ink flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-mute" />
              <span>Payments Received ({customer.payments.length})</span>
            </h3>
            <Link
              href="/staff/payments/new"
              className="text-xs text-ink hover:underline font-medium flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Record Payment</span>
            </Link>
          </div>
          {customer.payments.length === 0 ? (
            <div className="p-6 text-center text-xs text-mute">No payments recorded.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-hairline text-[10px] font-mono uppercase text-mute">
                <tr>
                  <th className="px-5 py-2.5">Payment Ref</th>
                  <th className="px-5 py-2.5">Method</th>
                  <th className="px-5 py-2.5">Date</th>
                  <th className="px-5 py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {customer.payments.map((p) => (
                  <tr key={p.id} className="hover:bg-canvas/50">
                    <td className="px-5 py-3 font-mono font-medium text-ink">
                      {p.payment_reference}
                    </td>
                    <td className="px-5 py-3 capitalize">
                      {p.payment_method.replace("_", " ")}
                    </td>
                    <td className="px-5 py-3">{p.payment_date}</td>
                    <td className="px-5 py-3 text-right font-mono font-semibold text-emerald-600">
                      +${p.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

