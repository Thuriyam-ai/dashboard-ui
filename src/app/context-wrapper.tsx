"use client";

import React from 'react';

export function ContextWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default ContextWrapper;