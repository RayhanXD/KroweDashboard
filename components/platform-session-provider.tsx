"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import type { PlatformDashboardDto } from "@/lib/platform/buildDashboardDto";

export type PlatformSessionState = {
  sessionId: string | null;
  data: PlatformDashboardDto | null;
  loading: boolean;
  error: string | null;
};

const PlatformSessionContext = createContext<PlatformSessionState | null>(null);

export function PlatformSessionProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id")?.trim() ?? null;

  const [data, setData] = useState<PlatformDashboardDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/platform/dashboard-data?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            typeof json?.error === "string" ? json.error : res.statusText
          );
        }
        return json as PlatformDashboardDto;
      })
      .then((dto) => {
        if (!cancelled) setData(dto);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setData(null);
          setError(e instanceof Error ? e.message : "Failed to load dashboard data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const value = useMemo<PlatformSessionState>(
    () => ({
      sessionId,
      data,
      loading,
      error,
    }),
    [sessionId, data, loading, error]
  );

  return (
    <PlatformSessionContext.Provider value={value}>
      {children}
    </PlatformSessionContext.Provider>
  );
}

export function usePlatformSession(): PlatformSessionState {
  const ctx = useContext(PlatformSessionContext);
  if (!ctx) {
    throw new Error("usePlatformSession must be used within PlatformSessionProvider");
  }
  return ctx;
}
