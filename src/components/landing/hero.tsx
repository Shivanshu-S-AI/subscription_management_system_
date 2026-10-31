import Link from "next/link";
import { ArrowRight, ChevronRight, Activity, Database, Sparkles, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 hero-mesh-gradient border-b border-hairline">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas-elevated/90 px-3 py-1 shadow-whisper backdrop-blur-sm">
          <span className="flex h-1.5 w-1.5 rounded-full bg-link"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-body">
            Data Analysis, Reimagined
          </span>
          <ChevronRight className="h-3 w-3 text-mute" />
        </div>

        {/* Large Prominent Headline */}
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-2.4px] text-ink max-w-3xl mx-auto leading-[1.08]">
          Turn your data into decisions.
        </h1>

        {/* Supporting Value Proposition */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-body max-w-2xl mx-auto font-normal leading-relaxed">
          Explore, analyse and visualize your data in one powerful workspace.
          Discover meaningful patterns and make more informed decisions.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-whisper transition-all hover:bg-black hover:scale-[1.01]"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#capabilities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-canvas-elevated px-6 py-3 text-sm font-medium text-ink shadow-whisper transition-all hover:bg-canvas hover:border-mute/40"
          >
            Learn More
          </Link>
        </div>

        {/* Restrained Data & Analytics Minimal Element */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="rounded-md border border-hairline bg-canvas-elevated/95 p-4 sm:p-5 shadow-whisper backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline/70 pb-3 text-xs text-mute font-mono">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-body font-medium">ANALYTICS ENGINE: ACTIVE</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Latency: 12ms</span>
                <span>Dataset: 1.48M rows</span>
                <span>Precision: 99.98%</span>
              </div>
            </div>

            {/* Micro visual data indicators */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="rounded-sm border border-hairline-soft bg-canvas p-2.5">
                <div className="text-[11px] font-mono text-mute">STREAM VELOCITY</div>
                <div className="text-base font-semibold text-ink mt-0.5">24.6k/s</div>
                <div className="text-[11px] text-emerald-600 font-mono mt-0.5">+14% vs avg</div>
              </div>
              <div className="rounded-sm border border-hairline-soft bg-canvas p-2.5">
                <div className="text-[11px] font-mono text-mute">PATTERN CLUSTERS</div>
                <div className="text-base font-semibold text-ink mt-0.5">18 detected</div>
                <div className="text-[11px] text-link font-mono mt-0.5">4 high variance</div>
              </div>
              <div className="rounded-sm border border-hairline-soft bg-canvas p-2.5">
                <div className="text-[11px] font-mono text-mute">CORRELATION FACTOR</div>
                <div className="text-base font-semibold text-ink mt-0.5">0.942 r</div>
                <div className="text-[11px] text-mute font-mono mt-0.5">confidence: 99%</div>
              </div>
              <div className="rounded-sm border border-hairline-soft bg-canvas p-2.5">
                <div className="text-[11px] font-mono text-mute">ANOMALIES RESOLVED</div>
                <div className="text-base font-semibold text-ink mt-0.5">0 flags</div>
                <div className="text-[11px] text-mute font-mono mt-0.5">stable baseline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

