import Link from "next/link";
import { FileSpreadsheet, Plus, Tag } from "lucide-react";
import { getDiscounts, getProducts } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default function DiscountsPage() {
  const discounts = getDiscounts();
  const products = getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Catalog & Pricing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Discount Rules
          </h1>
          <p className="text-xs text-body mt-1">
            Admin-governed promotion rules, usage caps, and eligibility criteria.
          </p>
        </div>

        <Link
          href="/admin/discounts/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Discount</span>
        </Link>
      </div>

      {/* Discounts Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Discount Code</th>
                <th className="px-5 py-3 font-medium">Type & Value</th>
                <th className="px-5 py-3 font-medium">Eligibility Conditions</th>
                <th className="px-5 py-3 font-medium">Applicability</th>
                <th className="px-5 py-3 font-medium">Usage / Cap</th>
                <th className="px-5 py-3 font-medium">Validity Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {discounts.map((d) => {
                const targetProduct = d.product_id
                  ? products.find((p) => p.id === d.product_id)
                  : null;

                return (
                  <tr key={d.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-semibold text-ink text-sm bg-canvas px-2 py-1 rounded-sm border border-hairline">
                        {d.code}
                      </span>
                      <span className="text-xs text-mute block mt-1">
                        {d.description || "No description"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-emerald-600 block">
                        {d.discount_type === "percentage"
                          ? `${d.discount_value}% OFF`
                          : `-$${d.discount_value.toFixed(2)}`}
                      </span>
                      <span className="font-mono text-[10px] text-mute uppercase">
                        {d.discount_type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-mute text-xs">
                      {d.min_purchase_amount ? (
                        <div>Min Purchase: ${d.min_purchase_amount.toFixed(2)}</div>
                      ) : null}
                      {d.min_quantity ? (
                        <div>Min Qty: {d.min_quantity} seat(s)</div>
                      ) : null}
                      {!d.min_purchase_amount && !d.min_quantity && (
                        <span>No minimum threshold</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {d.applies_to === "all_subscriptions" ? (
                        <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink">
                          Whole Subscription
                        </span>
                      ) : (
                        <div>
                          <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink block mb-0.5">
                            Specific Product
                          </span>
                          <span className="text-xs text-mute font-medium truncate block max-w-xs">
                            {targetProduct?.name || "Target Product"}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs">
                      <span className="font-semibold text-ink">{d.times_used}</span>
                      <span className="text-mute">
                        {" "}
                        / {d.usage_limit ? d.usage_limit : "∞"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-mute">
                      {d.start_date || "Active"} → {d.end_date || "Ongoing"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

