"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { signInAction } from "@/modules/auth/actions";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessBanner(
        "Account created successfully. Please sign in with your credentials."
      );
    } else if (searchParams.get("reset") === "success") {
      setSuccessBanner(
        "Your password has been reset successfully. Please sign in with your new password."
      );
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("rememberMe", rememberMe ? "true" : "false");

    const redirectTarget = searchParams.get("redirect") || "";
    if (redirectTarget) {
      formData.append("redirect", redirectTarget);
    }

    startTransition(async () => {
      try {
        const result = await signInAction(null, formData);
        if (result && !result.success) {
          setErrorMessage(result.error || "Invalid email or password.");
        }
      } catch (err: any) {
        if (err?.message?.includes("NEXT_REDIRECT")) return;
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your customer account to view your subscriptions, orders, and billing invoices."
      eyebrow="Customer Portal"
      footer={
        <div className="space-y-3">
          <p>
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-medium text-ink hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
          <div className="pt-2 border-t border-hairline-soft">
            <Link
              href="/internal-login"
              className="text-[11px] text-mute hover:text-body transition-colors"
            >
              Are you an internal staff member or administrator?
            </Link>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Success Alert */}
        {successBanner && (
          <div className="flex items-start gap-2.5 rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-600 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-sm border border-error/20 bg-error/5 p-3 text-xs text-error font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-ink mb-1.5"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="h-10 w-full rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs text-ink placeholder:text-mute focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
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

        {/* Remember me option */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-3.5 w-3.5 rounded-[3px] border-hairline text-ink focus:ring-ink"
          />
          <label
            htmlFor="rememberMe"
            className="text-xs text-body select-none cursor-pointer"
          >
            Remember this device
          </label>
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
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-xs text-mute">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
