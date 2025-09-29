"use client";

import AuthGuard from "@/components/auth-guard/auth-guard";
import { AuthProvider } from "@/contexts/auth-context";
import React from "react";

export function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <AuthGuard>{children}</AuthGuard>
      </AuthProvider>
    </>
  );
}

export default ContextWrapper;
