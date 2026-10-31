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
} from "lucide-react";
import { getCustomerById } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function CustomerDetailPage({
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
          href="/admin/customers"
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

        {/* Quick action buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/admin/quotations/new?customerId=${customer.id}`}
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
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Total Revenue Paid
          </span>
          <div className="text-xl font-semibold text-emerald-600 mt-1">
            {formatCurrency(totalSpent)}
          </div>
        </div>
        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Outstanding Due
          </span>
          <div className="text-xl font-semibold text-error mt-1">
            {formatCurrency(totalOutstanding)}
          </div>
        </div>
        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Active Subscriptions
          </span>
          <div className="text-xl font-semibold text-ink mt-1">
            {customer.subscriptions.filter((s) => s.status === "active").length}
          </div>
        </div>
        <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Customer Since
          </span>
          <div className="text-sm font-mono text-body mt-2">
            {customer.created_at.split("T")[0]}
          </div>
        </div>
      </div>

      {/* Account Info Card */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
        <h2 className="text-sm font-semibold text-ink mb-4 font-mono uppercase tracking-wider text-xs">
          Account Profile & Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-mute block text-[11px] mb-1">Email Address</span>
            <span className="font-medium text-ink flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-mute" />
              {customer.email}
            </span>
          </div>
          <div>
            <span className="text-mute block text-[11px] mb-1">Phone Number</span>
            <span className="font-medium text-ink flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-mute" />
              {customer.phone || "Not provided"}
            </span>
          </div>
          <div>
            <span className="text-mute block text-[11px] mb-1">Billing Address</span>
            <span className="font-medium text-ink block">
              {customer.address || "Not provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-ink" />
            <h2 className="text-sm font-semibold text-ink">Associated Subscriptions</h2>
          </div>
          <span className="font-mono text-xs text-mute">
            {customer.subscriptions.length} records
          </span>
        </div>

        {customer.subscriptions.length === 0 ? (
          <p className="text-xs text-mute py-4 text-center">No subscriptions on record.</p>
        ) : (
          <div className="divide-y divide-hairline-soft">
            {customer.subscriptions.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/subscriptions/${s.id}`}
                    className="font-mono font-semibold text-ink hover:text-link"
                  >
                    {s.subscription_number}
                  </Link>
                  <span className="text-mute block text-[11px] mt-0.5">
                    Started {s.start_date} · Next Billing {s.next_billing_date} ({s.billing_frequency})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-ink">{formatCurrency(s.total_amount)}</span>
                  <span
                    className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                      s.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-canvas text-mute border border-hairline"
                    }`}
                  >
                    {s.status}
                  </span>
                  <Link
                    href={`/admin/subscriptions/${s.id}`}
                    className="rounded-sm border border-hairline bg-canvas p-1 hover:bg-canvas-elevated"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-mute" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoices Section */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-ink" />
            <h2 className="text-sm font-semibold text-ink">Associated Invoices</h2>
          </div>
          <span className="font-mono text-xs text-mute">{customer.invoices.length} invoices</span>
        </div>

        {customer.invoices.length === 0 ? (
          <p className="text-xs text-mute py-4 text-center">No invoices generated yet.</p>
        ) : (
          <div className="divide-y divide-hairline-soft">
            {customer.invoices.map((inv) => (
              <div key={inv.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="font-mono font-semibold text-ink hover:text-link"
                  >
                    {inv.invoice_number}
                  </Link>
                  <span className="text-mute block text-[11px] mt-0.5">
                    Issued {inv.issue_date} · Due {inv.due_date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-semibold text-ink block">{formatCurrency(inv.total_amount)}</span>
                    {inv.amount_due > 0 && (
                      <span className="text-[10px] font-mono text-error block">
                        Due: {formatCurrency(inv.amount_due)}
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
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="rounded-sm border border-hairline bg-canvas p-1 hover:bg-canvas-elevated"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-mute" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payments Section */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-ink" />
            <h2 className="text-sm font-semibold text-ink">Recorded Payments</h2>
          </div>
          <span className="font-mono text-xs text-mute">{customer.payments.length} transactions</span>
        </div>

        {customer.payments.length === 0 ? (
          <p className="text-xs text-mute py-4 text-center">No payments on record.</p>
        ) : (
          <div className="divide-y divide-hairline-soft">
            {customer.payments.map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-medium text-ink">{p.payment_reference}</span>
                  <span className="text-mute block text-[11px] mt-0.5">
                    {p.payment_date} · {p.notes || "No notes"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-600 block">
                    +{formatCurrency(p.amount)}
                  </span>
                  <span className="font-mono text-[10px] text-mute uppercase block">
                    {p.payment_method.replace("_", " ")}
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

