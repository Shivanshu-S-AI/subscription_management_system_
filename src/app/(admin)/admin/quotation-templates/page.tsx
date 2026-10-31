import Link from "next/link";
import { Layers, Plus, ArrowRight } from "lucide-react";
import { getQuotationTemplates, getProducts, getPlans } from "@/lib/data/store";

export default function QuotationTemplatesPage() {
  const templates = getQuotationTemplates();
  const products = getProducts();
  const plans = getPlans();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Sales & Customers
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Quotation Templates
          </h1>
          <p className="text-xs text-body mt-1">
            Predefined plans and bundled product lines for standardized offers.
          </p>
        </div>

        <Link
          href="/admin/quotation-templates/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Template</span>
        </Link>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => {
          const plan = plans.find((p) => p.id === tpl.plan_id);

          return (
            <div
              key={tpl.id}
              className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink text-base">
                    {tpl.name}
                  </span>
                  <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-mute">
                    Valid {tpl.validity_days} days
                  </span>
                </div>
                <p className="text-xs text-body mt-2">
                  {tpl.description || "No description provided."}
                </p>

                <div className="mt-4 pt-4 border-t border-hairline-soft space-y-2">
                  <div className="text-xs">
                    <span className="text-mute font-mono text-[11px] block">Assigned Plan:</span>
                    <span className="text-ink font-medium">{plan?.name || "Standard Plan"}</span>
                  </div>

                  <div className="text-xs">
                    <span className="text-mute font-mono text-[11px] block">Preconfigured Items:</span>
                    <div className="space-y-1 mt-1">
                      {tpl.lines.map((l) => {
                        const prod = products.find((p) => p.id === l.product_id);
                        const variant = prod?.variants.find((v) => v.id === l.variant_id);
                        return (
                          <div
                            key={l.id}
                            className="font-mono text-[11px] text-body flex items-center justify-between bg-canvas px-2 py-1 rounded-xs border border-hairline-soft"
                          >
                            <span>
                              {prod?.name}{" "}
                              {variant && (
                                <span className="text-emerald-600">({variant.name})</span>
                              )}
                            </span>
                            <span className="text-mute font-semibold">Qty: {l.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center justify-between">
                <span className="text-[11px] font-mono text-mute">
                  Ready to quote
                </span>
                <Link
                  href={`/admin/quotations/new?templateId=${tpl.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-link hover:underline"
                >
                  <span>Use in Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

