import Link from "next/link";
import { getQuotationTemplates, getProducts, getPlans } from "@/lib/data/store";

export default function QuotationTemplatesPage() {
  const templates = getQuotationTemplates();
  const products = getProducts();
  const plans = getPlans();

  return (
    <div className="space-y-8">
      {/* BEGIN: HeaderSection */}
      <section
        className="border-b border-slate-200/80 dark:border-slate-800 pb-6 mb-8"
        data-purpose="page-header"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            {/* Eyebrow Category */}
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              SALES &amp; CUSTOMERS
            </p>
            {/* Page Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mt-2">
              Quotation Templates
            </h1>
          </div>
          {/* Action Button */}
          <div className="shrink-0">
            <Link
              href="/admin/quotation-templates/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4.5v15m7.5-7.5h-15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>New Template</span>
            </Link>
          </div>
        </div>
      </section>
      {/* END: HeaderSection */}

      {/* BEGIN: TemplateGridContainer */}
      <section
        aria-label="Templates Grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {templates.map((tpl) => {
          const plan = plans.find((p) => p.id === tpl.plan_id);

          return (
            /* BEGIN: QuotationTemplateCard */
            <article
              key={tpl.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-subtle hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              data-purpose="quotation-template-card"
            >
              {/* Card Interior Content */}
              <div className="p-6">
                {/* Card Header & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                    {tpl.name}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 uppercase">
                    VALID {tpl.validity_days} DAYS
                  </span>
                </div>
                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {tpl.description || "No description provided."}
                </p>
                {/* Divider */}
                <div className="border-t border-slate-100 dark:border-slate-800 my-5" />
                {/* Assigned Plan */}
                <div className="mb-4">
                  <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                    ASSIGNED PLAN
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {plan?.name || "Enterprise Monthly Plan"}
                  </p>
                </div>
                {/* Preconfigured Items List */}
                <div>
                  <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-2">
                    PRECONFIGURED ITEMS
                  </h3>
                  <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-lg p-1.5 space-y-1">
                    {tpl.lines.map((l) => {
                      const prod = products.find((p) => p.id === l.product_id);
                      const variant = prod?.variants.find(
                        (v) => v.id === l.variant_id
                      );
                      return (
                        <div
                          key={l.id}
                          className="flex items-center justify-between px-2.5 py-2 rounded-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs shadow-xs"
                        >
                          <span className="font-medium text-slate-700 dark:text-slate-200 truncate pr-2">
                            {prod?.name || "Product"}{" "}
                            {variant && (
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                ({variant.name})
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                            Qty: {l.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <footer className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end text-xs">
                <Link
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 transition-colors group-hover:translate-x-0.5 transform duration-150"
                  href={`/admin/quotations/new?templateId=${tpl.id}`}
                >
                  <span>Use in Quote</span>
                  <svg
                    className="h-3.5 w-3.5 stroke-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </footer>
            </article>
          );
        })}
      </section>
      {/* END: TemplateGridContainer */}
    </div>
  );
}
