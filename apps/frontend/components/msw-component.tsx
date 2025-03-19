"use client";

import { useState, useEffect, type PropsWithChildren } from "react";

const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

export const MSWComponent = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(() => !isMockingEnabled);

  useEffect(() => {
    const initialize = async () => {
      if (isMockingEnabled) {
        const { initMockAPI } = await import("~/mocks/index");
        await initMockAPI();
        setIsReady(true);
      }
    };

    if (!isReady) {
      initialize();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
