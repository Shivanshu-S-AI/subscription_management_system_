'use client';

import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { Database, BarChart3, Sparkles } from 'lucide-react';

const Component = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <main ref={ref} {...props} className="relative">
        <article className="relative">
          {/* Section 1 */}
          <section className="text-white min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center sticky top-0 px-4 py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                <Database className="w-4 h-4" />
                <span>DATA EXPLORATION &amp; INSIGHTS</span>
              </div>

              <h1 className="2xl:text-7xl text-5xl sm:text-6xl px-4 font-bold text-center tracking-tight leading-[115%] text-white">
                I Know What Exactly you&apos;re <br /> Looking For! Scroll Please 👇
              </h1>

              <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
                Experience fluid data intelligence with seamless momentum scrolling and reactive visual stacking.
              </p>

              <div className="pt-4 flex justify-center">
                <div className="w-full max-w-xl rounded-xl border border-slate-800/80 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                    alt="Data Analytics Platform"
                    className="w-full h-56 sm:h-72 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col items-center justify-center min-h-screen sticky top-0 rounded-tr-3xl rounded-tl-3xl overflow-hidden px-4 py-20 border-t border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-sky-600 dark:text-sky-400 shadow-xs">
                <BarChart3 className="w-4 h-4" />
                <span>ADVANCED VISUALIZATION</span>
              </div>

              <h1 className="2xl:text-7xl text-4xl sm:text-5xl px-4 font-bold text-center tracking-tight leading-[115%]">
                here is it<br /> enjoy it!
              </h1>

              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
                Unravel deep transactional patterns with multi-dimensional analytics and automated anomaly detection.
              </p>

              <div className="pt-4 flex justify-center">
                <div className="w-full max-w-xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-2 shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                    alt="Visual Data Analytics"
                    className="w-full h-56 sm:h-72 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="text-white min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center sticky top-0 rounded-tr-3xl rounded-tl-3xl overflow-hidden px-4 py-20 border-t border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>EXECUTIVE REPORTING</span>
              </div>

              <h1 className="2xl:text-7xl text-5xl sm:text-6xl px-4 font-bold text-center tracking-tight leading-[115%] text-white">
                Thanks To Scroll.
                <br /> Now Scroll Up Again☝️🏿
              </h1>

              <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
                Automated recurring reconciliations and real-time revenue intelligence built for modern enterprises.
              </p>

              <div className="pt-4 flex justify-center">
                <div className="w-full max-w-xl rounded-xl border border-slate-800/80 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
                    alt="Cloud Architecture & Performance"
                    className="w-full h-56 sm:h-72 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;
