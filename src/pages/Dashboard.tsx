import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { JobStatus, LeadSource, LeadStage } from "@/convex/schema";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardList,
  HardHat,
  Loader2,
  LogOut,
  MapPin,
  Phone,
  Plus,
  Radio,
  Radar,
  Rocket,
  Star,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Static configuration — the blueprint, scoped to home improvement only.
// ---------------------------------------------------------------------------

const STAGES: { id: LeadStage; label: string; accent: string }[] = [
  { id: "new", label: "New", accent: "#b9764f" },
  { id: "contacted", label: "Contacted", accent: "#c39a5f" },
  { id: "qualified", label: "Qualified", accent: "#7d9483" },
  { id: "quoted", label: "Quoted", accent: "#6b7f94" },
  { id: "won", label: "Won", accent: "#4f7a5c" },
  { id: "lost", label: "Lost", accent: "#9a938a" },
];

const JOB_FLOW: { id: JobStatus; label: string; accent: string }[] = [
  { id: "scheduled", label: "Scheduled", accent: "#a49a8a" },
  { id: "dispatched", label: "Dispatched", accent: "#6b7f94" },
  { id: "in_progress", label: "In progress", accent: "#c39a5f" },
  { id: "complete", label: "Complete", accent: "#7d9483" },
  { id: "paid", label: "Paid out", accent: "#4f7a5c" },
];

const SOURCE_LABELS: Record<LeadSource, string> = {
  google_search: "Google Search Ad",
  outbound: "Outbound dial",
  b2b_partner: "B2B partner",
  referral: "Referral",
};

const SERVICE_LINES = [
  "Roofing",
  "Kitchen Remodel",
  "Bath Remodel",
  "Flooring",
  "Windows & Doors",
  "Exterior Painting",
  "Decks & Fencing",
  "Drywall & Repairs",
  "Basement Finishing",
  "Gutters & Siding",
];

const KPI_TARGETS = [
  { label: "Speed to lead", value: "38s avg", note: "24/7 live human answer" },
  { label: "Show rate", value: "82%", note: "Confirmed via SMS cadence" },
];

const PILLARS = [
  {
    index: "01",
    title: "Demand capture",
    icon: Radar,
    summary: "Geofenced search campaigns and partner outreach, run from HQ with no local storefront.",
    points: [
      "Home improvement keyword sets — roofing, remodel, bath, flooring, exterior",
      "Reassurance copy: 24/7 live human, instant dispatch, vetted local pros",
      "Outbound to property managers, estate planners, brokers, storage facilities",
    ],
  },
  {
    index: "02",
    title: "24/7 remote intake",
    icon: Phone,
    summary: "Philippines-based agents answer every live call and form fill within seconds.",
    points: [
      "Inbound ad calls and web forms answered before the lead cools",
      "Power-dialer outbound prospecting into local home improvement leads",
      "Scope, photos, access notes and load details captured before handoff",
      "Dials/hour, contact rate, lead-to-appointment and show-rate tracking",
    ],
  },
  {
    index: "03",
    title: "Sales & contracts",
    icon: Building2,
    summary: "Centralized CRM pipeline with digital estimation and e-signed agreements.",
    points: [
      "GoHighLevel / HubSpot as system of record with automated SMS follow-up",
      "Volume-based and scope-of-work estimates from customer media",
      "PandaDoc / DocuSign agreements covering scope and crew guidelines",
    ],
  },
  {
    index: "04",
    title: "Crew dispatch",
    icon: HardHat,
    summary: "Independent licensed home improvement pros execute on site while we own the client.",
    points: [
      "Vetted general contractors and trade specialists, no storefront overhead",
      "Out-of-state expansion where unlicensed GC management is permitted",
      "Job orders, addresses, photos and windows pushed to crew smartphones",
    ],
  },
  {
    index: "05",
    title: "Payments & financing",
    icon: Wallet,
    summary: "Deposits, progress installments, crew payouts and consumer lending in one flow.",
    points: [
      "Stripe / Square card deposits; Plaid + ACH for $5k–$20k+ balances",
      "Automated 1099 crew payouts at milestones; Wise / Veem for PH payroll",
      "Third-party lending (dealer fee priced into the estimate, not a commission)",
    ],
  },
];

const WORKFLOW = [
  { step: "01", title: "Demand trigger", detail: "Homeowner clicks a home improvement search ad or our outbound team makes contact." },
  { step: "02", title: "24/7 intake", detail: "Remote agents answer in seconds, qualify scope, and capture photos and access notes." },
  { step: "03", title: "Consult & contract", detail: "Sales issues the estimate, collects the e-signature, and secures deposit or financing." },
  { step: "04", title: "Job dispatch", detail: "The matched local crew receives the job order and schedule window on mobile." },
  { step: "05", title: "Field completion", detail: "Crew finishes the scope and submits site completion proof with photos." },
  { step: "06", title: "Final settlement", detail: "We collect the customer balance and release the automated crew payout." },
];

// ---------------------------------------------------------------------------

const money = (value: number) => `$${value.toLocaleString("en-US")}`;

function ageLabel(timestamp: number) {
  const hours = (Date.now() - timestamp) / 3_600_000;
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))}m ago`;
  if (hours < 24) return `${Math.round(hours)}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

const stageMeta = (stage: LeadStage) => STAGES.find((s) => s.id === stage) ?? STAGES[0];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const leads = useQuery(api.ops.listLeads);
  const jobs = useQuery(api.ops.listJobs);
  const contractors = useQuery(api.ops.listContractors);

  const seedDemo = useMutation(api.ops.seedDemo);
  const seededRef = useRef(false);
  const [seeding, setSeeding] = useState(false);

  const [view, setView] = useState<"pipeline" | "dispatch" | "crews" | "blueprint">("pipeline");
  const [selectedLeadId, setSelectedLeadId] = useState<Id<"leads"> | null>(null);

  // Fill the console once so a brand new workspace is not a blank shell.
  useEffect(() => {
    if (seededRef.current || leads === undefined || leads.length > 0) return;
    seededRef.current = true;
    setSeeding(true);
    seedDemo({})
      .catch(() => undefined)
      .finally(() => setSeeding(false));
  }, [leads, seedDemo]);

  const selectedLead = useMemo(
    () => leads?.find((lead) => lead._id === selectedLeadId) ?? null,
    [leads, selectedLeadId],
  );

  const stats = useMemo(() => {
    const list = leads ?? [];
    const jobList = jobs ?? [];
    const crewList = contractors ?? [];
    const open = list.filter((l) => l.stage !== "won" && l.stage !== "lost");
    const advanced = list.filter((l) => l.stage === "qualified" || l.stage === "quoted" || l.stage === "won");
    return {
      openValue: open.reduce((sum, l) => sum + l.estimatedValue, 0),
      openCount: open.length,
      qualifyRate: list.length ? Math.round((advanced.length / list.length) * 100) : 0,
      liveJobs: jobList.filter((j) => j.status === "dispatched" || j.status === "in_progress").length,
      activeCrews: crewList.filter((c) => c.active).length,
      crewTotal: crewList.length,
      payoutsPending: jobList.filter((j) => j.status === "complete").reduce((sum, j) => sum + j.payout, 0),
    };
  }, [leads, jobs, contractors]);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDemo({});
      toast.success("Demo pipeline loaded", { description: "Home improvement leads, crews and dispatched jobs." });
    } catch (error) {
      toast.error("Could not load demo data", {
        description: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setSeeding(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const loading = leads === undefined || jobs === undefined || contractors === undefined;

  const nav: { id: typeof view; label: string; icon: typeof Radar; count?: number }[] = [
    { id: "pipeline", label: "Lead pipeline", icon: Radar, count: leads?.length },
    { id: "dispatch", label: "Job dispatch", icon: ClipboardList, count: jobs?.length },
    { id: "crews", label: "Crew network", icon: Users, count: contractors?.length },
    { id: "blueprint", label: "Ops blueprint", icon: Building2 },
  ];

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#252523]">
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#252523]/10 bg-[#f3f0e9]/90 px-5 backdrop-blur-sm sm:px-8">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
          <span className="flex size-8 items-center justify-center rounded-full border border-[#252523]/25">
            <HardHat className="size-4" strokeWidth={1.6} />
          </span>
          Ridgeline <span className="hidden font-normal text-[#9b9990] sm:inline">/ Ops console</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 border border-[#252523]/15 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#6d6c67] uppercase md:flex">
            <Radio className="size-3.5 text-[#4f7a5c]" /> Intake live · 24/7
          </span>
          <span className="hidden text-xs text-[#9b9990] sm:block">{user?.email || "Operations"}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            aria-label="Sign out"
            className="text-[#6d6c67] hover:bg-[#e7e3d9] hover:text-[#252523]"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[248px_1fr]">
        <aside className="hidden border-r border-[#252523]/10 px-6 py-10 lg:block">
          <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[#9b9990] uppercase">
            Home improvement ops
          </p>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-sm transition-colors ${
                    active ? "bg-[#e7e3d9] text-[#252523]" : "text-[#6d6c67] hover:text-[#252523]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-4" strokeWidth={1.6} /> {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span className="font-mono text-[10px] text-[#9b9990]">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-[#252523]/10 pt-6">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#9b9990] uppercase">
              Intake targets
            </p>
            <div className="space-y-3">
              {KPI_TARGETS.map((kpi) => (
                <div key={kpi.label} className="flex items-baseline justify-between text-xs">
                  <span className="text-[#9b9990]">{kpi.label}</span>
                  <span className="font-mono">{kpi.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-[11px] leading-5 text-[#9b9990]">
            We sell and dispatch. Independent local crews execute. No storefront, no local licensing in every market.
          </p>
        </aside>

        <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-[#9b6b50] uppercase">
                {format(new Date(), "EEEE, d MMMM yyyy")}
              </p>
              <h1 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                {view === "pipeline" && "Live demand"}
                {view === "dispatch" && "Crew dispatch"}
                {view === "crews" && "Crew network"}
                {view === "blueprint" && "Operations blueprint"}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <NewLeadDialog disabled={loading} />
            </div>
          </div>

          {/* Mobile nav */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  view === item.id
                    ? "border-[#252523] bg-[#252523] text-[#f3f0e9]"
                    : "border-[#252523]/15 text-[#6d6c67]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* KPI strip */}
          <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
            <StatCard label="Open pipeline" value={money(stats.openValue)} note={`${stats.openCount} live leads`} />
            <StatCard label="Qualification rate" value={`${stats.qualifyRate}%`} note="Qualified or beyond" />
            <StatCard label="Jobs in field" value={String(stats.liveJobs)} note="Dispatched / in progress" />
            <StatCard label="Crews on call" value={`${stats.activeCrews}/${stats.crewTotal}`} note="Active coverage" />
            <StatCard label="Payouts pending" value={money(stats.payoutsPending)} note="Awaiting release" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center border border-[#252523]/15 bg-[#e7e3d9] py-32">
              <Loader2 className="size-5 animate-spin text-[#9b9990]" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {view === "pipeline" && (
                  <PipelineView
                    leads={leads}
                    seeding={seeding}
                    onSeed={handleSeed}
                    onSelect={setSelectedLeadId}
                    selectedLeadId={selectedLeadId}
                  />
                )}
                {view === "dispatch" && <DispatchView jobs={jobs} />}
                {view === "crews" && <CrewsView contractors={contractors} />}
                {view === "blueprint" && <BlueprintView />}
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </div>

      <LeadInspector lead={selectedLead} onClose={() => setSelectedLeadId(null)} />
    </main>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="border border-[#252523]/12 bg-[#ebe7de] px-4 py-4">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9b9990] uppercase">{label}</p>
      <p className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{value}</p>
      <p className="mt-1 text-[11px] text-[#6d6c67]">{note}</p>
    </div>
  );
}

function EmptyState({ label, hint, action }: { label: string; hint: string; action?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-[#252523]/25 bg-[#ebe7de] px-6 py-16 text-center">
      <p className="font-serif text-xl">{label}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-[#6d6c67]">{hint}</p>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pipeline
// ---------------------------------------------------------------------------

function PipelineView({
  leads,
  seeding,
  onSeed,
  onSelect,
  selectedLeadId,
}: {
  leads: ReturnType<typeof useQuery<typeof api.ops.listLeads>>;
  seeding: boolean;
  onSeed: () => void;
  onSelect: (id: Id<"leads">) => void;
  selectedLeadId: Id<"leads"> | null;
}) {
  const list = leads ?? [];
  if (list.length === 0) {
    return (
      <EmptyState
        label={seeding ? "Loading the demo pipeline…" : "No leads captured yet"}
        hint="Intake writes every ad call, form fill and outbound dial here. Log one with “New lead”, or load a sample home improvement pipeline to see the board at work."
        action={
          seeding ? null : (
            <Button
              onClick={onSeed}
              className="mt-6 rounded-full bg-[#252523] px-5 text-xs font-medium tracking-[0.08em] text-[#f3f0e9] uppercase hover:bg-[#454541]"
            >
              <Rocket className="mr-2 size-3.5" /> Load demo pipeline
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-4">
      {STAGES.map((stage) => {
        const columnLeads = list.filter((lead) => lead.stage === stage.id);
        const columnValue = columnLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
        return (
          <div key={stage.id} className="w-[248px] shrink-0">
            <div className="mb-3 flex items-center justify-between border-b border-[#252523]/12 pb-2">
              <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] uppercase">
                <span className="size-2 rounded-full" style={{ backgroundColor: stage.accent }} />
                {stage.label}
              </span>
              <span className="font-mono text-[10px] text-[#9b9990]">
                {columnLeads.length} · {money(columnValue)}
              </span>
            </div>
            <div className="space-y-2">
              {columnLeads.map((lead) => (
                <button
                  key={lead._id}
                  onClick={() => onSelect(lead._id)}
                  className={`w-full border bg-[#ebe7de] px-3.5 py-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#d7d1c5] ${
                    selectedLeadId === lead._id ? "border-[#252523]/60" : "border-[#252523]/12"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-tight">{lead.name}</p>
                    <span className="font-mono text-[10px] text-[#9b9990]">{ageLabel(lead.createdAt)}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#6d6c67]">
                    {lead.service} · {lead.city}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[11px]">{money(lead.estimatedValue)}</span>
                    <span className="text-[9px] font-semibold tracking-[0.14em] text-[#9b9990] uppercase">
                      {SOURCE_LABELS[lead.source]}
                    </span>
                  </div>
                </button>
              ))}
              {columnLeads.length === 0 && (
                <div className="border border-dashed border-[#252523]/15 px-3 py-6 text-center text-[11px] text-[#9b9990]">
                  Empty
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LeadInspector({
  lead,
  onClose,
}: {
  lead: NonNullable<ReturnType<typeof useQuery<typeof api.ops.listLeads>>>[number] | null;
  onClose: () => void;
}) {
  const updateStage = useMutation(api.ops.updateLeadStage);
  const [pending, setPending] = useState<LeadStage | null>(null);

  const handleStage = async (stage: LeadStage) => {
    if (!lead) return;
    setPending(stage);
    try {
      await updateStage({ id: lead._id, stage });
      toast.success(`Moved to ${stageMeta(stage).label}`, { description: lead.name });
    } catch (error) {
      toast.error("Could not update the lead", {
        description: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setPending(null);
    }
  };

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#252523]/25 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-[420px] overflow-y-auto border-l border-[#252523]/15 bg-[#f3f0e9] p-7"
          >
            <div className="mb-10 flex items-start justify-between">
              <span
                className="flex size-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${stageMeta(lead.stage).accent}26`, color: stageMeta(lead.stage).accent }}
              >
                <MapPin className="size-4" />
              </span>
              <button onClick={onClose} aria-label="Close" className="text-[#6d6c67] hover:text-[#252523]">
                <X className="size-4" />
              </button>
            </div>

            <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#9b6b50] uppercase">
              {SOURCE_LABELS[lead.source]} · {ageLabel(lead.createdAt)}
            </p>
            <h2 className="font-serif text-3xl tracking-[-0.03em]">{lead.name}</h2>
            <p className="mt-2 text-sm text-[#6d6c67]">
              {lead.service} · {lead.city}
            </p>

            <div className="my-7 grid grid-cols-2 gap-4 border-y border-[#252523]/12 py-5 text-xs">
              <div>
                <p className="text-[10px] tracking-[0.14em] text-[#9b9990] uppercase">Estimate</p>
                <p className="mt-1 font-mono text-sm">{money(lead.estimatedValue)}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-[#9b9990] uppercase">Intake agent</p>
                <p className="mt-1 text-sm">{lead.agent || "Unassigned"}</p>
              </div>
            </div>

            {lead.notes && (
              <div className="mb-8">
                <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-[#9b9990] uppercase">
                  Intake notes
                </p>
                <p className="text-sm leading-6 text-[#6d6c67]">{lead.notes}</p>
              </div>
            )}

            <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-[#9b9990] uppercase">
              Pipeline stage
            </p>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => handleStage(stage.id)}
                  disabled={pending !== null}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors disabled:opacity-50 ${
                    lead.stage === stage.id
                      ? "border-transparent text-[#f3f0e9]"
                      : "border-[#252523]/15 text-[#6d6c67] hover:border-[#252523]/40 hover:text-[#252523]"
                  }`}
                  style={lead.stage === stage.id ? { backgroundColor: stage.accent } : undefined}
                >
                  {stage.label}
                </button>
              ))}
            </div>

            <div className="mt-10 space-y-3 border-t border-[#252523]/12 pt-6 text-xs text-[#6d6c67]">
              <p className="flex items-center gap-2">
                <Phone className="size-3.5" /> {lead.phone}
              </p>
              <p className="flex items-center gap-2">
                <Building2 className="size-3.5" /> Agreement issued through the CRM pipeline
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function NewLeadDialog({ disabled }: { disabled: boolean }) {
  const createLead = useMutation(api.ops.createLead);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaving(true);
    try {
      await createLead({
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        city: String(data.get("city") || "").trim(),
        service: String(data.get("service")),
        source: data.get("source") as LeadSource,
        estimatedValue: Number(data.get("value")) || 0,
        agent: "Manual entry",
      });
      toast.success("Lead captured", { description: "Intake will pick it up in the pipeline." });
      setOpen(false);
    } catch (error) {
      toast.error("Could not save the lead", {
        description: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="rounded-full bg-[#252523] px-5 text-xs font-medium tracking-[0.08em] text-[#f3f0e9] uppercase hover:bg-[#454541]"
        >
          <Plus className="mr-2 size-3.5" /> New lead
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#252523]/15 bg-[#f3f0e9] sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-[-0.02em]">Capture a lead</DialogTitle>
          <DialogDescription className="text-[#6d6c67]">
            Mirrors what the 24/7 intake team logs before handoff to sales.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Homeowner">
              <Input name="name" required placeholder="Jordan Reyes" />
            </Field>
            <Field label="Phone">
              <Input name="phone" required placeholder="(503) 555-0100" />
            </Field>
            <Field label="Market">
              <Input name="city" required placeholder="Portland, OR" />
            </Field>
            <Field label="Estimate (USD)">
              <Input name="value" type="number" min={0} step={100} defaultValue={12000} required />
            </Field>
            <Field label="Service line">
              <select
                name="service"
                className="h-9 w-full border border-[#252523]/15 bg-transparent px-3 text-sm outline-none"
              >
                {SERVICE_LINES.map((line) => (
                  <option key={line} value={line}>
                    {line}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Source">
              <select
                name="source"
                className="h-9 w-full border border-[#252523]/15 bg-transparent px-3 text-sm outline-none"
              >
                {Object.entries(SOURCE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-[#252523] text-xs font-medium tracking-[0.08em] text-[#f3f0e9] uppercase hover:bg-[#454541]"
            >
              {saving ? <Loader2 className="mr-2 size-3.5 animate-spin" /> : <ArrowRight className="mr-2 size-3.5" />}
              Log lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold tracking-[0.16em] text-[#9b9990] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

function DispatchView({ jobs }: { jobs: ReturnType<typeof useQuery<typeof api.ops.listJobs>> }) {
  const updateStatus = useMutation(api.ops.updateJobStatus);
  const [pending, setPending] = useState<Id<"jobs"> | null>(null);
  const list = jobs ?? [];

  if (list.length === 0) {
    return (
      <EmptyState
        label="Nothing on the board"
        hint="Won deals become dispatched job orders here, with addresses, scope and schedule windows sent to crew phones."
      />
    );
  }

  const advance = async (id: Id<"jobs">, status: JobStatus, title: string) => {
    setPending(id);
    try {
      await updateStatus({ id, status });
      toast.success(`Marked ${JOB_FLOW.find((s) => s.id === status)?.label}`, { description: title });
    } catch (error) {
      toast.error("Could not update the job", {
        description: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="grid gap-3 xl:grid-cols-5">
      {JOB_FLOW.map((status) => {
        const lane = list.filter((job) => job.status === status.id);
        const index = JOB_FLOW.findIndex((s) => s.id === status.id);
        const next = JOB_FLOW[index + 1];
        return (
          <div key={status.id}>
            <div className="mb-3 flex items-center justify-between border-b border-[#252523]/12 pb-2">
              <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] uppercase">
                <span className="size-2 rounded-full" style={{ backgroundColor: status.accent }} />
                {status.label}
              </span>
              <span className="font-mono text-[10px] text-[#9b9990]">{lane.length}</span>
            </div>
            <div className="space-y-2">
              {lane.map((job) => (
                <div key={job._id} className="border border-[#252523]/12 bg-[#ebe7de] px-3.5 py-3">
                  <p className="text-sm font-medium leading-tight">{job.title}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#6d6c67]">
                    <MapPin className="size-3" /> {job.address} · {job.city}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#6d6c67]">
                    <HardHat className="size-3" /> {job.contractorName}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#252523]/10 pt-2.5 font-mono text-[10px]">
                    <span>{money(job.contractValue)}</span>
                    <span className="text-[#9b9990]">payout {money(job.payout)}</span>
                  </div>
                  <p className="mt-2 text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">
                    {format(new Date(job.scheduledFor), "EEE d MMM · h:mma")}
                  </p>
                  {next && (
                    <button
                      onClick={() => advance(job._id, next.id, job.title)}
                      disabled={pending === job._id}
                      className="mt-3 flex w-full items-center justify-between border-t border-[#252523]/10 pt-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#6d6c67] transition-colors hover:text-[#252523] disabled:opacity-50"
                    >
                      {pending === job._id ? "Saving…" : `Mark ${next.label}`}
                      <ArrowRight className="size-3.5" />
                    </button>
                  )}
                </div>
              ))}
              {lane.length === 0 && (
                <div className="border border-dashed border-[#252523]/15 px-3 py-6 text-center text-[11px] text-[#9b9990]">
                  Clear
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Crews
// ---------------------------------------------------------------------------

function CrewsView({ contractors }: { contractors: ReturnType<typeof useQuery<typeof api.ops.listContractors>> }) {
  const setActive = useMutation(api.ops.setContractorActive);
  const list = contractors ?? [];

  if (list.length === 0) {
    return (
      <EmptyState
        label="No crew partners yet"
        hint="Vetted local home improvement contractors join here — licensed, insured, and paid at milestone completion."
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((crew) => (
        <div key={crew._id} className="border border-[#252523]/12 bg-[#ebe7de] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9b6b50] uppercase">{crew.trade}</p>
              <h3 className="mt-1.5 font-serif text-xl leading-tight tracking-[-0.02em]">{crew.name}</h3>
            </div>
            <Switch
              checked={crew.active}
              onCheckedChange={(checked) => setActive({ id: crew._id, active: checked })}
              aria-label={`Toggle ${crew.name}`}
            />
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#6d6c67]">
            <MapPin className="size-3" /> {crew.city} · {crew.phone}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#252523]/10 pt-4 text-xs">
            <div>
              <p className="text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">Rating</p>
              <p className="mt-1 flex items-center gap-1 font-mono">
                <Star className="size-3 text-[#c39a5f]" /> {crew.rating.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">Jobs</p>
              <p className="mt-1 font-mono">{crew.jobsCompleted}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">Licensed</p>
              <p className="mt-1 flex items-center gap-1 text-[11px]">
                {crew.licensed ? (
                  <>
                    <BadgeCheck className="size-3.5 text-[#4f7a5c]" /> Yes
                  </>
                ) : (
                  "No"
                )}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[10px] font-semibold tracking-[0.14em] uppercase">
            <span className={crew.active ? "text-[#4f7a5c]" : "text-[#9b9990]"}>
              {crew.active ? "On call" : "Paused"}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Blueprint
// ---------------------------------------------------------------------------

function BlueprintView() {
  return (
    <div className="space-y-10">
      <div className="border border-[#252523]/12 bg-[#ebe7de] p-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#9b6b50] uppercase">Strategic positioning</p>
        <p className="mt-4 max-w-3xl font-serif text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">
          A high-margin sales and dispatch platform for home improvement. Customer acquisition, intake and sales stay
          centralized; licensed local crews execute. No storefronts, no heavy equipment, no local licensing in every
          market.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.index} className="border border-[#252523]/12 bg-[#ebe7de] p-6">
              <div className="mb-6 flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-full border border-[#252523]/20">
                  <Icon className="size-4" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[10px] text-[#9b9990]">{pillar.index}</span>
              </div>
              <h3 className="font-serif text-2xl tracking-[-0.03em]">{pillar.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-[#6d6c67]">{pillar.summary}</p>
              <ul className="mt-5 space-y-2.5 border-t border-[#252523]/10 pt-5">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[12px] leading-5 text-[#6d6c67]">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#9b6b50]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div>
        <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[#9b6b50] uppercase">
          End-to-end workflow
        </p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {WORKFLOW.map((step) => (
            <div key={step.step} className="flex gap-4 border border-[#252523]/12 p-5">
              <span className="font-serif text-2xl text-[#b9764f]">{step.step}</span>
              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="mt-1.5 text-[12px] leading-5 text-[#6d6c67]">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border border-[#252523]/12 bg-[#252523] p-7 text-[#f3f0e9] sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#c9bfa8] uppercase">Scaling rule</p>
          <p className="mt-2 max-w-2xl font-serif text-xl leading-snug tracking-[-0.02em]">
            Sell the scope, own the customer, dispatch the trade. Repeat per market.
          </p>
        </div>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full bg-[#f3f0e9] px-5 text-xs font-medium tracking-[0.08em] text-[#252523] uppercase hover:bg-[#dcd6c8]"
        >
          <Rocket className="mr-2 size-3.5" /> Back to demand
        </Button>
      </div>
    </div>
  );
}
