"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface PlanTier {
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
}

const plans: PlanTier[] = [
  {
    name: "Starter Plan",
    monthlyPrice: 29,
    annualPrice: 24,
    description: "Ideal for individual analysts and small teams exploring initial data sets.",
    features: [
      "Up to 2 active analysis workspaces",
      "Full Data Exploration engine",
      "Core 2D visualization charts",
      "Standard CSV & JSON ingestion",
      "Community support & docs",
    ],
    ctaText: "Choose Starter",
    highlighted: false,
  },
  {
    name: "Professional Plan",
    badge: "Most Popular",
    monthlyPrice: 79,
    annualPrice: 65,
    description: "Engineered for growing teams that need deeper correlation & automated reporting.",
    features: [
      "Unlimited analysis workspaces",
      "High-speed pattern discovery engine",
      "All 20+ specialized visualization types",
      "Direct PostgreSQL connection",
      "Automated summary report generation",
      "Priority email & chat support",
    ],
    ctaText: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise Plan",
    name_suffix: "(Custom / Volume)",
    monthlyPrice: 199,
    annualPrice: 169,
    description: "Tailored for organizations with high-volume datasets and bespoke compliance needs.",
    features: [
      "Dedicated compute capacity",
      "Custom data retention policies",
      "Multi-seat team workspace permissions",
      "Enterprise audit logs & security",
      "Dedicated account representative",
      "Guaranteed 99.9% uptime SLA",
    ],
    ctaText: "Contact Sales",
    highlighted: false,
  } as PlanTier,
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Subscription Pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-1.28px] text-ink">
            Predictable plans. Built to scale.
          </h2>
          <p className="mt-4 text-base text-body">
            Choose the subscription cadence that matches your analytical workload.
            All plans include a 14-day evaluation trial.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-hairline bg-canvas-elevated p-1 shadow-whisper">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-ink text-white shadow-whisper"
                  : "text-body hover:text-ink"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-ink text-white shadow-whisper"
                  : "text-body hover:text-ink"
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-link-soft px-1.5 py-0.2 text-[10px] font-semibold text-link-deep">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;

            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-lg border bg-canvas-elevated p-8 transition-all ${
                  plan.highlighted
                    ? "border-ink shadow-floating ring-1 ring-ink"
                    : "border-hairline shadow-whisper hover:border-mute/40"
                }`}
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold tracking-tight text-ink font-sans">
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-ink">
                      ${price}
                    </span>
                    <span className="text-xs text-mute font-mono">
                      / month {billingCycle === "yearly" && "(billed annually)"}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-body">
                    {plan.description}
                  </p>

                  <div className="my-6 border-t border-hairline-soft" />

                  {/* Features list */}
                  <ul className="space-y-3 text-xs text-body">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-hairline-soft">
                  <Link
                    href="/signup"
                    className={`flex h-10 w-full items-center justify-center rounded-full text-xs font-medium transition-all ${
                      plan.highlighted
                        ? "bg-ink text-white hover:bg-black shadow-whisper"
                        : "border border-hairline bg-canvas-elevated text-ink hover:bg-canvas"
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-mute font-mono">
                    14-day free trial · Cancel anytime
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
