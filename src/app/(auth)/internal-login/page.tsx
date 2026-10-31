"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { internalSignInAction } from "@/modules/auth/actions";
import { AlertCircle, ShieldAlert, Loader2 } from "lucide-react";

function InternalLoginForm() {
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  return (
    <AuthCard
      title="Internal Operations"
      subtitle="Authorized Brightloop Software administrators and internal staff only."
      eyebrow="Staff & Admin Access"
      footer={
        <div className="space-y-2">
          <p className="text-[11px] text-mute">
            Looking for the customer portal?{" "}
            <Link
              href="/login"
              className="text-body font-medium hover:text-ink transition-colors"
            >
              Customer Login
            </Link>
          </p>
          <p className="text-[10px] text-mute font-mono">
            All access attempts are logged and monitored.
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Security Notice Pill */}
        <div className="flex items-center gap-2 rounded-sm border border-hairline bg-canvas p-2.5 text-[11px] text-mute">
          <ShieldAlert className="h-3.5 w-3.5 text-body shrink-0" />
          <span>Restricted operational environment</span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-sm border border-error/20 bg-error/5 p-3 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Account Identifier / Admin ID */}
        <div>
          <label
            htmlFor="identifier"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Admin ID / Account Identifier
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="admin@brightloop.com"
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
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
          />
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
            <span>Sign In to Operations</span>
          )}
        </button>
      </form>
    </AuthCard>
  );
}

export default function InternalLoginPage() {
  return (
    <Suspense fallback={<div className="text-xs text-mute">Loading internal login...</div>}>
      <InternalLoginForm />
    </Suspense>
  );
}
