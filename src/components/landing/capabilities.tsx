import { Search, BarChart3, TrendingUp, FileText } from "lucide-react";

const capabilities = [
  {
    icon: Search,
    title: "Data Exploration",
    description:
      "Interrogate multi-source datasets without complex SQL pipelines. Perform instant slicing, filtering, grouping, and aggregations across millions of rows with immediate feedback.",
    metric: "Sub-second query response",
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    description:
      "Transform raw numbers into clear, high-density visuals. Generate scatter plots, distributions, time-series trends, and comparative bar graphs designed for visual clarity.",
    metric: "20+ tailored chart geometries",
  },
  {
    icon: TrendingUp,
    title: "Pattern Discovery",
    description:
      "Uncover hidden correlations and structural shifts. Identify seasonal anomalies and statistical variance across historical records before they impact operational decisions.",
    metric: "Automated regression & anomaly flags",
  },
  {
    icon: FileText,
    title: "Reporting & Insights",
    description:
      "Synthesize analytical findings into polished, executive briefs. Share interactive views and export reproducible datasets with team members and key stakeholders.",
    metric: "Reproducible export formats",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Core Capabilities
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-1.28px] text-ink">
            Engineered for analytical rigor.
          </h2>
          <p className="mt-4 text-base text-body">
            Brightloop gives analysts, founders, and decision-makers the exact tools required to
            extract clarity from complex data streams.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div id="features" className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-md border border-hairline bg-canvas-elevated p-6 sm:p-8 shadow-whisper transition-all duration-200 hover:border-mute/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline bg-canvas text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-[-0.4px] text-ink">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {cap.description}
                </p>

                <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center justify-between text-xs text-mute font-mono">
                  <span>CAPABILITY METRIC</span>
                  <span className="text-ink font-medium">{cap.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

