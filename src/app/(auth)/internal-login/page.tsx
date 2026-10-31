"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { internalSignInAction } from "@/modules/auth/actions";
import {
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Loader2,
  Check,
  Lock,
} from "lucide-react";

type RoleTab = "staff" | "admin";

function InternalLoginForm() {
  const searchParams = useSearchParams();
  const initialRole: RoleTab =
    searchParams.get("role") === "admin" ||
    searchParams.get("redirect")?.includes("/admin")
      ? "admin"
      : "staff";

  const [activeTab, setActiveTab] = useState<RoleTab>(initialRole);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleTabSwitch = (tab: RoleTab) => {
    setActiveTab(tab);
    setErrorMessage(null);
    setIdentifier("");
    setPassword("");
  };

  const handleSelectQuickAccount = (email: string, pass: string) => {
    setIdentifier(email);
    setPassword(pass);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password) {
      setErrorMessage("Please enter both your account identifier and password.");
      return;
    }

    const formData = new FormData();
    formData.append("identifier", identifier);
    formData.append("password", password);
    formData.append("targetRole", activeTab);

    const redirectTarget = searchParams.get("redirect") || "";
    if (redirectTarget) {
      formData.append("redirect", redirectTarget);
    }

    startTransition(async () => {
      try {
        const result = await internalSignInAction(null, formData);
        if (result && !result.success) {
          setErrorMessage(result.error || "Authentication failed.");
        }
      } catch (err: any) {
        if (err?.message?.includes("NEXT_REDIRECT")) return;
        setErrorMessage("An unexpected authentication error occurred.");
      }
    });
  };

  const isAdmin = activeTab === "admin";

  return (
    <AuthCard
      title={isAdmin ? "Administrator Sign In" : "Internal Staff Sign In"}
      subtitle={
        isAdmin
          ? "Full administrative control: catalog, plans, billing automations, taxes, and system reports."
          : "Operational daily workspace: customer inquiries, quotations, subscriptions, invoices, and payments."
      }
      eyebrow={isAdmin ? "Executive Management" : "Daily Operations"}
      footer={
        <div className="space-y-2">
          <p className="text-[11px] text-mute">
            Looking for the customer portal?{" "}
            <Link
              href="/login"
              className="text-body font-medium hover:text-ink transition-colors underline decoration-hairline underline-offset-4"
            >
              Customer Login
            </Link>
          </p>
          <p className="text-[10px] text-mute font-mono">
            Restricted corporate system. All operational actions are logged and audited.
          </p>
        </div>
      }
    >
      {/* 2-Tab Selector Card Header */}
      <div className="grid grid-cols-2 p-1 bg-canvas border border-hairline rounded-[6px] gap-1 mb-5">
        <button
          type="button"
          onClick={() => handleTabSwitch("staff")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-sm text-xs transition-all ${
            !isAdmin
              ? "bg-canvas-elevated text-ink font-semibold shadow-whisper border border-hairline/80"
              : "text-mute hover:text-ink hover:bg-canvas-elevated font-medium"
          }`}
        >
          <UserCheck className="h-3.5 w-3.5 shrink-0" />
          <span>Internal Staff</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch("admin")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-sm text-xs transition-all ${
            isAdmin
              ? "bg-canvas-elevated text-ink font-semibold shadow-whisper border border-hairline/80"
              : "text-mute hover:text-ink hover:bg-canvas-elevated font-medium"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>Administrator</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden targetRole field */}
        <input type="hidden" name="targetRole" value={activeTab} />

        {/* Quick-Fill Account Suggestion Chips */}
        <div className="rounded-sm border border-hairline bg-canvas/60 p-2.5">
          <div className="flex items-center justify-between text-[11px] text-mute mb-2">
            <span className="font-mono uppercase tracking-wider text-[10px]">
              {isAdmin ? "Direct Admin Accounts" : "Direct Staff Accounts"}
            </span>
            <span className="text-[10px] text-mute">1-click select</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {isAdmin ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectQuickAccount(
                      "shivanshu@brightloopsoftware.com",
                      "Admin#2026!"
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] transition-colors ${
                    identifier === "shivanshu@brightloopsoftware.com"
                      ? "border-ink bg-ink text-white font-medium"
                      : "border-hairline bg-canvas-elevated text-body hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {identifier === "shivanshu@brightloopsoftware.com" && (
                    <Check className="h-3 w-3" />
                  )}
                  Shivanshu
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectQuickAccount(
                      "aryan@brightloopsoftware.com",
                      "Admin#2026!"
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] transition-colors ${
                    identifier === "aryan@brightloopsoftware.com"
                      ? "border-ink bg-ink text-white font-medium"
                      : "border-hairline bg-canvas-elevated text-body hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {identifier === "aryan@brightloopsoftware.com" && (
                    <Check className="h-3 w-3" />
                  )}
                  Aryan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectQuickAccount(
                      "hiren@brightloopsoftware.com",
                      "Admin#2026!"
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] transition-colors ${
                    identifier === "hiren@brightloopsoftware.com"
                      ? "border-ink bg-ink text-white font-medium"
                      : "border-hairline bg-canvas-elevated text-body hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {identifier === "hiren@brightloopsoftware.com" && (
                    <Check className="h-3 w-3" />
                  )}
                  Hiren Sir
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectQuickAccount(
                      "staff@brightloopsoftware.com",
                      "Staff#2026!"
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] transition-colors ${
                    identifier === "staff@brightloopsoftware.com"
                      ? "border-ink bg-ink text-white font-medium"
                      : "border-hairline bg-canvas-elevated text-body hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {identifier === "staff@brightloopsoftware.com" && (
                    <Check className="h-3 w-3" />
                  )}
                  Alex Rivera
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectQuickAccount(
                      "james.ops@brightloopsoftware.com",
                      "Staff#2026!"
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] transition-colors ${
                    identifier === "james.ops@brightloopsoftware.com"
                      ? "border-ink bg-ink text-white font-medium"
                      : "border-hairline bg-canvas-elevated text-body hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {identifier === "james.ops@brightloopsoftware.com" && (
                    <Check className="h-3 w-3" />
                  )}
                  James Wilson
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-sm border border-error/20 bg-error/5 p-3 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Account Identifier */}
        <div>
          <label
            htmlFor="identifier"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            {isAdmin ? "Administrator Email or Identifier" : "Staff Email or Identifier"}
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={
              isAdmin
                ? "shivanshu@brightloopsoftware.com"
                : "staff@brightloopsoftware.com"
            }
            className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors font-mono"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-ink"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-mute hover:text-ink transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated pl-3 pr-8 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
            />
            <Lock className="absolute right-2.5 top-3 h-4 w-4 text-mute pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-ink text-xs font-medium text-white shadow-whisper transition-all hover:bg-black disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>
              {isAdmin ? "Sign In as Administrator" : "Sign In as Internal Staff"}
            </span>
          )}
        </button>

        {/* Role Workspace Destination Note */}
        <div className="text-center">
          <span className="font-mono text-[10px] text-mute">
            {isAdmin
              ? "Accesses full administrative console (/admin)"
              : "Accesses operational staff console (/staff)"}
          </span>
        </div>
      </form>
    </AuthCard>
  );
}

export default function InternalLoginPage() {
  return (
    <Suspense fallback={<div className="text-xs text-mute text-center py-8">Loading internal portal...</div>}>
      <InternalLoginForm />
    </Suspense>
  );
}
