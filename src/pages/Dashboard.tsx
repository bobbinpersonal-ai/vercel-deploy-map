import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { createFirestoreRecord, updateFirestoreRecord, useFirestoreCollection } from "@/lib/firestore-data";
import { BarChart3, Loader2, LogOut, Plus, Users, Wallet, Phone, BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Lead = { id: string; name: string; phone: string; city: string; service: string; source?: string; stage?: string; estimatedValue?: number; notes?: string };
const stages = ["new", "contacted", "qualified", "quoted", "won", "lost"] as const;
const money = (value = 0) => `$${value.toLocaleString("en-US")}`;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { records: leads, loading, error } = useFirestoreCollection<Lead>("leads");
  const { records: jobs } = useFirestoreCollection("jobs");
  const { records: contractors } = useFirestoreCollection("contractors");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedStage, setSelectedStage] = useState("all");

  const filteredLeads = selectedStage === "all" ? leads : leads.filter((lead) => (lead.stage ?? "new") === selectedStage);
  const openLeads = leads.filter((lead) => !["won", "lost"].includes(lead.stage ?? "new"));
  const pipelineValue = openLeads.reduce((total, lead) => total + (lead.estimatedValue ?? 0), 0);

  async function addLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    try {
      await createFirestoreRecord("leads", { name: form.get("name"), phone: form.get("phone"), city: form.get("city"), service: form.get("service"), estimatedValue: Number(form.get("value") ?? 0), source: "manual", stage: "new", agent: user?.email ?? "Admin" });
      toast.success("Lead added");
      setShowForm(false);
      event.currentTarget.reset();
    } catch (value) { toast.error(value instanceof Error ? value.message : "Could not save lead"); }
    finally { setSaving(false); }
  }

  return <main className="min-h-screen bg-[#f3f0e9] text-[#252523]">
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#252523]/10 bg-[#f3f0e9]/90 px-5 backdrop-blur-sm sm:px-8"><div className="flex items-center gap-3 text-sm font-semibold tracking-[.16em] uppercase"><span className="flex size-8 items-center justify-center rounded-full bg-[#252523] text-[#f3f0e9]">L</span> LoveMeAfter <span className="hidden font-normal text-[#9b9990] sm:inline">/ Admin</span></div><div className="flex items-center gap-3"><span className="hidden text-xs text-[#6d6c67] sm:block">{user?.email}</span><Button variant="ghost" size="icon" onClick={async () => { await signOut(); navigate("/"); }}><LogOut className="size-4" /></Button></div></header>
    <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold tracking-[.2em] text-[#9b6b50] uppercase">Operations console</p><h1 className="mt-3 font-serif text-5xl tracking-[-.04em]">Live demand</h1><p className="mt-3 text-sm text-[#6d6c67]">Manage estimate requests, dispatch, crews, and your internal workspace.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => navigate("/admin/growth-engine")} className="rounded-full"><BarChart3 className="mr-2 size-4" /> Growth engine</Button><Button variant="outline" onClick={() => navigate("/admin/workspace")} className="rounded-full"><BriefcaseBusiness className="mr-2 size-4" /> Workspace</Button><Button onClick={() => setShowForm(!showForm)} className="rounded-full bg-[#252523] text-[#f3f0e9]"><Plus className="mr-2 size-4" /> New lead</Button></div></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Stat icon={Wallet} label="Open pipeline" value={money(pipelineValue)} note={`${openLeads.length} open leads`} /><Stat icon={Users} label="Total leads" value={String(leads.length)} note="All sources" /><Stat icon={BriefcaseBusiness} label="Jobs" value={String(jobs.length)} note="Firestore records" /><Stat icon={Phone} label="Active crews" value={String(contractors.filter((item) => item.active).length)} note={`${contractors.length} total partners`} /></div>
      {showForm && <form onSubmit={addLead} className="mt-6 grid gap-3 border border-[#252523]/12 bg-[#ebe7de] p-5 sm:grid-cols-2 lg:grid-cols-5"><Input name="name" required placeholder="Homeowner name" /><Input name="phone" required placeholder="Phone" /><Input name="city" required placeholder="City, state" /><Input name="service" required placeholder="Service" /><Input name="value" type="number" min="0" placeholder="Estimate value" /><Button disabled={saving} type="submit" className="rounded-full bg-[#252523] text-[#f3f0e9] sm:col-span-2 lg:col-span-5">{saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Plus className="mr-2 size-4" />} Save lead</Button></form>}
      <div className="mt-8 flex flex-wrap gap-2">{["all", ...stages].map((stage) => <button key={stage} onClick={() => setSelectedStage(stage)} className={`rounded-full border px-4 py-2 text-xs capitalize ${selectedStage === stage ? "border-[#252523] bg-[#252523] text-white" : "border-[#252523]/15 text-[#6d6c67]"}`}>{stage}</button>)}</div>
      {loading ? <div className="flex justify-center py-24"><Loader2 className="size-5 animate-spin" /></div> : error ? <div className="mt-8 border border-red-200 bg-red-50 p-5 text-sm text-red-800">Firestore is connected, but its security rules are blocking this screen. We will add the rules before deployment.</div> : <div className="mt-4 overflow-hidden border border-[#252523]/12 bg-[#ebe7de]"><div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-4 border-b border-[#252523]/10 px-5 py-3 text-[10px] font-semibold tracking-[.15em] text-[#9b9990] uppercase"><span>Lead</span><span>Service</span><span>Value</span><span>Stage</span><span>Action</span></div>{filteredLeads.length === 0 ? <p className="px-5 py-16 text-center text-sm text-[#6d6c67]">No leads in this stage yet.</p> : filteredLeads.map((lead) => <div key={lead.id} className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-[#252523]/10 px-5 py-4 text-sm last:border-0"><div><p className="font-medium">{lead.name}</p><p className="mt-1 text-xs text-[#6d6c67]">{lead.phone} · {lead.city}</p></div><span className="text-xs">{lead.service}</span><span className="font-mono text-xs">{money(lead.estimatedValue)}</span><select value={lead.stage ?? "new"} onChange={async (event) => { try { await updateFirestoreRecord("leads", lead.id, { stage: event.target.value }); } catch { toast.error("Could not update lead"); } }} className="h-8 rounded-full border border-[#252523]/15 bg-transparent px-3 text-xs capitalize"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="quoted">Quoted</option><option value="won">Won</option><option value="lost">Lost</option></select><a href={`tel:${lead.phone}`} aria-label={`Call ${lead.name}`} className="text-[#9b6b50]"><Phone className="size-4" /></a></div>)}</div>}
    </div>
  </main>;
}
function Stat({ icon: Icon, label, value, note }: { icon: typeof Wallet; label: string; value: string; note: string }) { return <div className="border border-[#252523]/12 bg-[#ebe7de] p-5"><Icon className="size-5 text-[#9b6b50]" /><p className="mt-6 text-[10px] font-semibold tracking-[.16em] text-[#9b9990] uppercase">{label}</p><p className="mt-2 font-serif text-3xl">{value}</p><p className="mt-1 text-xs text-[#6d6c67]">{note}</p></div>; }
