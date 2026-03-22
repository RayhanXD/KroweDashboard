import { Suspense } from "react";
import { PlatformSessionProvider } from "@/components/platform-session-provider";
import { AppLayoutClient } from "./app-layout-client";

function AppLayoutFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-600">
      Loading…
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AppLayoutFallback />}>
      <PlatformSessionProvider>
        <AppLayoutClient>{children}</AppLayoutClient>
      </PlatformSessionProvider>
    </Suspense>
  );
}
