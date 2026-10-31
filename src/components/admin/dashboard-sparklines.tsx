"use client";

import { useState } from "react";

interface SparkPoint {
  date: string;
  value: string;
  cx: number;
  cy: number;
}

interface SparklineProps {
  id: string;
  color: string;
  areaPath: string;
  linePath: string;
  points: SparkPoint[];
  label: string;
}

export function DashboardSparkline({
  id,
  color,
  areaPath,
  linePath,
  points,
  label,
}: SparklineProps) {
  const [activePoint, setActivePoint] = useState<SparkPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="flex-1 h-9 relative">
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 120 32"
      >
        <defs>
          <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#spark-${id})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="dark:!stroke-white"
        />
        <g className="spark-points">
          {points.map((pt, idx) => {
            const isLast = idx === points.length - 1;
            return (
              <circle
                key={idx}
                cx={pt.cx}
                cy={pt.cy}
                r={isLast ? 3.5 : 3}
                fill={isLast ? color : "currentColor"}
                className={`transition-all duration-150 cursor-pointer dark:!stroke-white ${
                  isLast
                    ? "fill-current stroke-white dark:stroke-slate-900 stroke-[1.5] hover:r-[5] dark:!fill-white"
                    : "fill-white dark:fill-slate-900 stroke-[2] hover:r-[4.5]"
                }`}
                style={{ stroke: color }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setActivePoint(pt);
                  setTooltipPos({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 6,
                  });
                }}
                onMouseLeave={() => {
                  setActivePoint(null);
                  setTooltipPos(null);
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Floating Tooltip */}
      {activePoint && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg px-2.5 py-1.5 shadow-xl border border-slate-700/60 dark:border-slate-600/60 text-xs font-mono tracking-tight flex flex-col gap-0.5 whitespace-nowrap"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full dark:!bg-white"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider">
              {activePoint.date}
            </span>
          </div>
          <div className="flex items-baseline gap-1 font-bold text-white text-xs">
            <span>{activePoint.value}</span>
            <span className="text-[10px] text-slate-400 font-normal">
              · {label}
            </span>
          </div>
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 border-r border-b border-slate-700/60 dark:border-slate-600/60 rotate-45" />
        </div>
      )}
    </div>
  );
}
