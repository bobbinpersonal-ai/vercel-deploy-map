import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/BottomNav";
import { EstimateRequestDialog } from "@/components/EstimateRequestDialog";
import { RequireAuth } from "@/components/RequireAuth";
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
const Careers = lazyRoute(() => import("./pages/Careers.tsx"));
const CareerRole = lazyRoute(() => import("./pages/CareerRole.tsx"));
const Services = lazyRoute(() => import("./pages/Services.tsx"));
const BuyerHome = lazyRoute(() => import("./pages/BuyerHome.tsx").then((module) => ({ default: module.BuyerHomeEnglish })));
const BuyerHomeSpanish = lazyRoute(() => import("./pages/BuyerHome.tsx").then((module) => ({ default: module.BuyerHomeSpanish })));
const SellYourHouse = lazyRoute(() => import("./pages/HomeBuyers.tsx").then((module) => ({ default: module.SellYourHouse })));
const SellYourLand = lazyRoute(() => import("./pages/HomeBuyers.tsx").then((module) => ({ default: module.SellYourLand })));
const SellYourHouseSpanish = lazyRoute(() => import("./pages/HomeBuyers.tsx").then((module) => ({ default: module.SellYourHouseSpanish })));
const SellYourLandSpanish = lazyRoute(() => import("./pages/HomeBuyers.tsx").then((module) => ({ default: module.SellYourLandSpanish })));
const InvestorsPage = lazyRoute(() => import("./pages/BuyerPrograms.tsx").then((module) => ({ default: module.InvestorsPage })));
const ReferralPage = lazyRoute(() => import("./pages/BuyerPrograms.tsx").then((module) => ({ default: module.ReferralPage })));
const PrivacyPage = lazyRoute(() => import("./pages/BuyerLegal.tsx").then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazyRoute(() => import("./pages/BuyerLegal.tsx").then((module) => ({ default: module.TermsPage })));
const Areas = lazyRoute(() => import("./pages/Areas.tsx"));
const Insights = lazyRoute(() => import("./pages/Insights.tsx"));
const TopicPost = lazyRoute(() => import("./pages/TopicPost.tsx"));
const Financing = lazyRoute(() => import("./pages/Financing.tsx"));
const CallLists = lazyRoute(() => import("./pages/CallLists.tsx"));
const AreaLanding = lazyRoute(() => import("./pages/AreaLanding.tsx"));
const MarketCareers = lazyRoute(() => import("./pages/MarketCareers.tsx"));
const ProjectProcess = lazyRoute(() => import("./pages/ProjectProcess.tsx"));
const Conditions = lazyRoute(() => import("./pages/Conditions.tsx"));
const Trades = lazyRoute(() => import("./pages/Trades.tsx"));
const ContractorPartners = lazyRoute(() => import("./pages/ContractorPartners.tsx"));
const PartnershipNetwork = lazyRoute(() => import("./pages/PartnershipNetwork.tsx"));
const ContractorApplications = lazyRoute(() => import("./pages/ContractorApplications.tsx"));
const MarketContractors = lazyRoute(() => import("./pages/MarketContractors.tsx"));
const AuthPage = lazyRoute(() => import("./pages/Auth.tsx"));
const Dashboard = lazyRoute(() => import("./pages/Dashboard.tsx"));
const Workspace = lazyRoute(() => import("./pages/Workspace.tsx"));
const InternalPreview = lazyRoute(() => import("./pages/InternalPreview.tsx"));
const GrowthEngine = lazyRoute(() => import("./pages/GrowthEngine.tsx"));
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
                ? "The page bundle may be out of date. Reload to fetch the latest version, or return to service areas."
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
                href="/areas"
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
              >
                Service areas
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
            <Route path="/" element={<BuyerHome />} />
            <Route path="/es" element={<BuyerHomeSpanish />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/roles/:role" element={<CareerRole />} />
            <Route path="/careers/:slug" element={<MarketCareers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sell-your-house" element={<SellYourHouse />} />
            <Route path="/sell-your-land" element={<SellYourLand />} />
            <Route path="/es/vender-casa" element={<SellYourHouseSpanish />} />
            <Route path="/es/vender-terreno" element={<SellYourLandSpanish />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/refer" element={<ReferralPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/services/:service" element={<ProjectProcess />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/contractors" element={<ContractorPartners />} />
            <Route path="/partnerships" element={<PartnershipNetwork />} />
            <Route path="/contractors/:slug" element={<MarketContractors />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/areas/:slug" element={<AreaLanding />} />
            <Route path="/areas/:slug/:city" element={<AreaLanding />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/topics/:topic" element={<TopicPost />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/auth" element={<AuthPage redirectAfterAuth="/dashboard" />} />
            <Route path="/login" element={<AuthPage redirectAfterAuth="/dashboard" />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/admin" element={<RequireAuth title="Sign in to manage LoveMeAfter" description="Leads, call lists, appointments, crews, and jobs live in the internal admin console."><Dashboard /></RequireAuth>} />
            <Route path="/admin/workspace" element={<RequireAuth title="Sign in to use the workspace" description="SOPs, projects, tasks, job posts, and internal work live here."><Workspace /></RequireAuth>} />
            <Route path="/admin/internal-preview" element={<RequireAuth title="Sign in to review the internal playbook" description="Sales, appointments, installer economics, and operating standards live here."><InternalPreview /></RequireAuth>} />
            <Route path="/admin/growth-engine" element={<RequireAuth title="Sign in to review the growth engine" description="The operating playbook is for authorized LoveMeAfter team members."><GrowthEngine /></RequireAuth>} />
            <Route path="/admin/call-lists" element={<RequireAuth title="Sign in to manage call lists" description="The telemarketing queue is for internal callers and appointment setters."><CallLists /></RequireAuth>} />
            <Route path="/admin/contractors" element={<RequireAuth title="Sign in to review contractors" description="Review partner applications and build the installation network."><ContractorApplications /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <BottomNav />
        <EstimateRequestDialog />
        </div>
      </BrowserRouter>
      <Toaster />
    </RootErrorBoundary>
  </StrictMode>,
);
