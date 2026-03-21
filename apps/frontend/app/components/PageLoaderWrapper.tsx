"use client";

import { useState } from "react";
import PageLoaderRobot from "./page-loader-robot";

export default function PageLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <PageLoaderRobot onComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
}