import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    name: "Connect",
    headline: "Bring in your data",
    description: "Ingest CSV files, connect PostgreSQL instances, or stream operational JSON payloads directly into your workspace.",
  },
  {
    step: "02",
    name: "Explore",
    headline: "Understand the information",
    description: "Auto-detect schemas, inspect missing fields, and examine statistical distribution profiles without writing boilerplates.",
  },
  {
    step: "03",
    name: "Analyse",
    headline: "Identify patterns and insights",
    description: "Apply comparative models, slice cohorts, and surface key inflection points across your metrics.",
  },
  {
    step: "04",
    name: "Share",
    headline: "Communicate your findings",
    description: "Export crisp vector charts, schedule summary reports, and align your team around validated data narratives.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Workflow Architecture
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-1.28px] text-ink">
            How Brightloop works.
          </h2>
          <p className="mt-4 text-base text-body">
            A linear, distraction-free workflow designed to take you from unorganized raw inputs
            to definitive business conclusions.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-mute mb-4">
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-canvas border border-hairline-soft font-semibold text-ink">
                    {item.step}
                  </span>
                  <span className="uppercase tracking-wider">{item.name}</span>
                </div>
                <h3 className="text-base font-semibold tracking-[-0.4px] text-ink">
                  {item.headline}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-end mt-4 text-mute">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
