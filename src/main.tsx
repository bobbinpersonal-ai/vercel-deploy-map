import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const CareerRole = lazy(() => import("./pages/CareerRole.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Areas = lazy(() => import("./pages/Areas.tsx"));
const Insights = lazy(() => import("./pages/Insights.tsx"));
const TopicPost = lazy(() => import("./pages/TopicPost.tsx"));
const Financing = lazy(() => import("./pages/Financing.tsx"));
const CallLists = lazy(() => import("./pages/CallLists.tsx"));
const AreaLanding = lazy(() => import("./pages/AreaLanding.tsx"));
const MarketCareers = lazy(() => import("./pages/MarketCareers.tsx"));
const ProjectProcess = lazy(() => import("./pages/ProjectProcess.tsx"));
const ContractorPartners = lazy(() => import("./pages/ContractorPartners.tsx"));
const ContractorApplications = lazy(() => import("./pages/ContractorApplications.tsx"));
const MarketContractors = lazy(() => import("./pages/MarketContractors.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Workspace = lazy(() => import("./pages/Workspace.tsx"));
const InternalPreview = lazy(() => import("./pages/InternalPreview.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

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
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
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
    window.scrollTo(0, 0);
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

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
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/roles/:role" element={<CareerRole />} />
            <Route path="/careers/:slug" element={<MarketCareers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:service" element={<ProjectProcess />} />
            <Route path="/contractors" element={<ContractorPartners />} />
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
            <Route path="/admin/internal-preview" element={<InternalPreview />} />
            <Route path="/admin/call-lists" element={<RequireAuth title="Sign in to manage call lists" description="The telemarketing queue is for internal callers and appointment setters."><CallLists /></RequireAuth>} />
            <Route path="/admin/contractors" element={<RequireAuth title="Sign in to review contractors" description="Review partner applications and build the installation network."><ContractorApplications /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </RootErrorBoundary>
  </StrictMode>,
);
