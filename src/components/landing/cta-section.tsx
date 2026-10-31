import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-canvas">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-mono text-xs uppercase tracking-wider text-mute">
          Start Your Journey
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.28px] text-ink leading-tight">
          Make better decisions with your data.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-body max-w-xl mx-auto">
          Start exploring your datasets today. Join companies and analysts who rely on Brightloop
          for precision analytics and decision intelligence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white shadow-whisper transition-all hover:bg-black hover:scale-[1.01]"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-canvas-elevated px-8 py-3.5 text-sm font-medium text-ink shadow-whisper transition-all hover:bg-canvas"
          >
            Sign In to Account
          </Link>
        </div>

        <p className="mt-4 text-xs font-mono text-mute">
          No credit card required for 14-day trial · Instant access
        </p>
      </div>
    </section>
  );
}

