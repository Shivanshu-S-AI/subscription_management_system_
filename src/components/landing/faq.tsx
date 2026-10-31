"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Brightloop?",
    answer:
      "Brightloop is a dedicated data analysis platform built to help teams explore datasets, discover patterns, generate visualizations, and make confident business decisions.",
  },
  {
    question: "Who can use the platform?",
    answer:
      "Brightloop is designed for analysts, department leads, founders, and decision-makers who need to analyze operational data without having to rely on complex engineering support.",
  },
  {
    question: "What can I do with the software?",
    answer:
      "You can ingest data from files and databases, filter and aggregate multi-table records, generate clear charts, detect structural statistical anomalies, and publish executive summary reports.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, Brightloop offers a 14-day free trial on our plans so you can evaluate our data exploration and visualization capabilities with your own datasets.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No specialized coding or advanced SQL knowledge is required. Brightloop provides an intuitive, high-performance workspace while preserving deep analytical flexibility for technical users.",
  },
  {
    question: "What subscription plans are available?",
    answer:
      "Brightloop offers monthly and annual subscription plans: Starter (for individuals), Professional (for growing data teams), and Enterprise (for high-volume organizations needing dedicated capacity).",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-1.28px] text-ink">
            Everything you need to know.
          </h2>
          <p className="mt-3 text-sm text-body">
            Common questions regarding Brightloop Software, features, and subscriptions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-hairline rounded-lg border border-hairline bg-canvas-elevated shadow-whisper">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-canvas/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-ink font-sans">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-mute transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-ink" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-body leading-relaxed border-t border-hairline-soft bg-canvas/30">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

