import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/BottomNav";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// A deployment can briefly serve an old page shell with new hashed chunks (or vice versa).
// Retry those failures once per route; a second failure is shown by the root boundary.
const chunkRetryKey = () => `lovemeafter:chunk-retry:${window.location.pathname}`;
const isChunkLoadError = (error: unknown) =>
  /dynamically imported module|failed to fetch dynamically|importing a module script failed|chunkloaderror/i.test(
    error instanceof Error ? error.message : String(error),
  );

function lazyRoute<T extends React.ComponentType>(
  load: () => Promise<{ default: T }>,
) {
  return lazy(() =>
    load()
      .then((module) => {
        try {
          window.sessionStorage.removeItem(chunkRetryKey());
        } catch {
          // Storage can be disabled; route loading should still work.
        }
        return module;
      })
      .catch((error: unknown) => {
        if (isChunkLoadError(error)) {
          try {
            const key = chunkRetryKey();
            if (!window.sessionStorage.getItem(key)) {
              window.sessionStorage.setItem(key, "1");
              window.location.reload();
            }
          } catch {
            // The error boundary below still provides a manual reload action.
          }
        }
        throw error;
      }),
  );
}

// Lazy load route components for better code splitting
const LawnHome = lazyRoute(() => import("./pages/LawnHome.tsx").then((module) => ({ default: module.LawnHomeEnglish })));
const LawnHomeSpanish = lazyRoute(() => import("./pages/LawnHome.tsx").then((module) => ({ default: module.LawnHomeSpanish })));
const MowingPage = lazyRoute(() => import("./pages/LawnService.tsx").then((module) => ({ default: module.MowingPage })));
const FertilizationPage = lazyRoute(() => import("./pages/LawnService.tsx").then((module) => ({ default: module.FertilizationPage })));
const WeedControlPage = lazyRoute(() => import("./pages/LawnService.tsx").then((module) => ({ default: module.WeedControlPage })));
const MowingSpanishPage = lazyRoute(() => import("./pages/LawnService.tsx").then((module) => ({ default: module.MowingSpanishPage })));
const FertilizationSpanishPage = lazyRoute(() => import("./pages/LawnService.tsx").then((module) => ({ default: module.FertilizationSpanishPage })));
const WeedControlSpanishPage = lazyRoute(() => import("./pages/LawnService.tsx").then((module) => ({ default: module.WeedControlSpanishPage })));
const GetQuote = lazyRoute(() => import("./pages/GetQuote.tsx"));
const LawnArea = lazyRoute(() => import("./pages/LawnArea.tsx"));
const PrivacyPage = lazyRoute(() => import("./pages/BuyerLegal.tsx").then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazyRoute(() => import("./pages/BuyerLegal.tsx").then((module) => ({ default: module.TermsPage })));
const NotFound = lazyRoute(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[WebContainer preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">
              {isChunkLoadError(new Error(this.state.message))
                ? "This page couldn’t load"
                : "Preview runtime error"}
            </p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {isChunkLoadError(new Error(this.state.message))
                ? "The page bundle may be out of date. Reload to fetch the latest version, or call us at (424) 426-0760."
                : this.state.message}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background"
              >
                Reload page
              </button>
              <a
                href="/get-quote"
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
              >
                Get My Price
              </a>
              <a href="/" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">
                Home
              </a>
            </div>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    let observer: MutationObserver | undefined;
    let frame = 0;
    const scrollToDestination = () => {
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          observer?.disconnect();
          return;
        }
        observer = new MutationObserver(() => {
          const delayedTarget = document.getElementById(location.hash.slice(1));
          if (delayedTarget) {
            delayedTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            observer?.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return;
      }
      window.scrollTo(0, 0);
    };
    frame = window.requestAnimationFrame(scrollToDestination);
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter>
        <RouteSyncer />
        <div className="site-theme">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<LawnHome />} />
            <Route path="/es" element={<LawnHomeSpanish />} />
            <Route path="/services/mowing" element={<MowingPage />} />
            <Route path="/services/fertilization" element={<FertilizationPage />} />
            <Route path="/services/weed-control" element={<WeedControlPage />} />
            <Route path="/es/corte-de-cesped" element={<MowingSpanishPage />} />
            <Route path="/es/fertilizacion" element={<FertilizationSpanishPage />} />
            <Route path="/es/control-de-malezas" element={<WeedControlSpanishPage />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/areas/texas/:city" element={<LawnArea />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <BottomNav />
        </div>
      </BrowserRouter>
      <Toaster />
    </RootErrorBoundary>
  </StrictMode>,
);
