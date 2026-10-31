import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-canvas selection:bg-link-soft selection:text-link-deep py-12">
      {children}
    </div>
  );
}
