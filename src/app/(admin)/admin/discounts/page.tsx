import Link from "next/link";
import { Plus } from "lucide-react";
import { getDiscounts, getProducts } from "@/lib/data/store";
import type { DiscountRule } from "@/types/admin";

function formatEligibility(d: DiscountRule): string {
  const conditions: string[] = [];
  if (d.min_purchase_amount) {
    conditions.push(`$${d.min_purchase_amount.toLocaleString()} min.`);
  }
  if (d.min_quantity) {
    conditions.push(`${d.min_quantity} seat${d.min_quantity === 1 ? "" : "s"} min.`);
  }
  return conditions.length > 0 ? conditions.join(" · ") : "None";
}

function formatDiscountValue(d: DiscountRule): string {
  if (d.discount_type === "percentage") {
    return `${d.discount_value}%`;
  }
  return `$${d.discount_value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function DiscountsPage() {
  const discounts = getDiscounts();
  const products = getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Catalog & Pricing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Discount Rules
          </h1>
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
                <th className="px-5 py-2.5 font-medium">Code</th>
                <th className="px-5 py-2.5 font-medium">Value</th>
                <th className="px-5 py-2.5 font-medium">Eligibility</th>
                <th className="px-5 py-2.5 font-medium">Applies To</th>
                <th className="px-5 py-2.5 font-medium">Usage</th>
                <th className="px-5 py-2.5 font-medium">Validity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {discounts.map((d) => {
                const targetProduct = d.product_id
                  ? products.find((p) => p.id === d.product_id)
                  : null;

                return (
                  <tr key={d.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono font-medium text-xs text-ink bg-canvas px-2 py-0.5 rounded-sm border border-hairline inline-block">
                        {d.code}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs font-semibold text-emerald-600">
                        {formatDiscountValue(d)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-mute whitespace-nowrap">
                      {formatEligibility(d)}
                    </td>
                    <td className="px-5 py-3 text-xs">
                      {d.applies_to === "all_subscriptions" ? (
                        <span className="text-body font-medium">All subscriptions</span>
                      ) : (
                        <span className="text-ink font-medium truncate block max-w-xs">
                          {targetProduct?.name || "Specific product"}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-body whitespace-nowrap">
                      {d.times_used} / {d.usage_limit ?? "∞"}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-mute whitespace-nowrap">
                      {d.start_date || "Active"} – {d.end_date || "Ongoing"}
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
