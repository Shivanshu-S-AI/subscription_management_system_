"use client";

import { Check, Dot } from "lucide-react";
import { PASSWORD_RULES } from "@/modules/auth/validation";

interface PasswordRequirementsProps {
  value: string;
}

export function PasswordRequirements({ value }: PasswordRequirementsProps) {
  if (!value) return null;

  return (
    <div className="mt-2.5 rounded-sm border border-hairline bg-canvas p-3 text-xs space-y-1.5 transition-all">
      <p className="font-mono text-[11px] uppercase tracking-wider text-mute mb-2">
        Password Requirements:
      </p>
      {PASSWORD_RULES.map((rule) => {
        const passes = rule.test(value);
        return (
          <div
            key={rule.id}
            className={`flex items-center gap-2 transition-colors ${
              passes ? "text-emerald-600 font-medium" : "text-mute"
            }`}
          >
            {passes ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            ) : (
              <Dot className="h-3.5 w-3.5 text-faint shrink-0" />
            )}
            <span>{rule.label}</span>
          </div>
        );
      })}
    </div>
  );
}
