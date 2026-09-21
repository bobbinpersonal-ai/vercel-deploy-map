import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Clock3, Loader2, Phone, Radio, Users } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function CallLists() {
  const navigate = useNavigate();
  const leads = useQuery(api.ops.listLeads);
  const updateStage = useMutation(api.ops.updateLeadStage);
  const [pending, setPending] = useState<Id<"leads"> | null>(null);
  const callList = (leads ?? []).filter((lead) => lead.stage === "new" || lead.stage === "contacted");

  const markContacted = async (id: Id<"leads">, name: string) => {
    setPending(id);
    try {
      await updateStage({ id, stage: "contacted" });
      toast.success("Call logged", { description: `${name} moved to contacted.` });
    } catch (error) {
      toast.error("Could not update the lead", { description: error instanceof Error ? error.message : "Try again." });
    } finally {
      setPending(null);
    }
  };

  return <main className="min-h-screen bg-[#f3f0e9] text-[#252523]"><header className="flex h-[76px] items-center justify-between border-b border-[#252523]/10 px-5 sm:px-8"><button onClick={() => navigate("/admin")} className="flex items-center gap-3 text-sm font-semibold tracking-[.14em] uppercase"><ArrowLeft className="size-4" /> Admin console</button><span className="flex items-center gap-2 text-xs text-[#6d6c67]"><Radio className="size-3.5 text-[#4f7a5c]" /> Calling team queue</span></header><section className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold tracking-[.2em] text-[#9b6b50] uppercase">Telemarketing workspace</p><h1 className="mt-3 font-serif text-5xl tracking-[-.04em]">Today’s call list</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#6d6c67]">Website requests, purchased data, and outbound opportunities are worked here before appointments are handed to a sales rep.</p></div><div className="flex gap-2"><div className="border border-[#252523]/12 bg-[#ebe7de] px-4 py-3"><p className="text-[10px] tracking-[.14em] text-[#9b9990] uppercase">Open calls</p><p className="mt-1 font-mono text-xl">{leads === undefined ? "—" : callList.length}</p></div><div className="border border-[#252523]/12 bg-[#ebe7de] px-4 py-3"><p className="text-[10px] tracking-[.14em] text-[#9b9990] uppercase">Appointment target</p><p className="mt-1 font-mono text-xl">2–3 / rep</p></div></div></div><div className="mt-8 overflow-hidden border border-[#252523]/12 bg-[#ebe7de]">{leads === undefined ? <div className="flex justify-center py-24"><Loader2 className="size-5 animate-spin text-[#9b9990]" /></div> : callList.length === 0 ? <div className="px-6 py-20 text-center"><Users className="mx-auto size-7 text-[#9b9990]" /><p className="mt-4 font-serif text-2xl">The queue is clear.</p><p className="mt-2 text-sm text-[#6d6c67]">New web requests and purchased records will appear here.</p></div> : <div className="divide-y divide-[#252523]/10">{callList.map((lead) => <div key={lead._id} className="grid gap-5 px-5 py-5 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center"><div><p className="text-sm font-semibold">{lead.name}</p><p className="mt-1 text-xs text-[#6d6c67]">{lead.service} · {lead.city}</p><p className="mt-2 flex items-center gap-2 text-xs text-[#6d6c67]"><Phone className="size-3.5" /> {lead.phone}</p></div><div><p className="text-[10px] tracking-[.14em] text-[#9b9990] uppercase">Source</p><p className="mt-1 text-xs">{lead.source === "inbound_web" ? "Website estimate" : lead.source === "outbound" ? "Purchased / outbound" : lead.source}</p></div><div><p className="text-[10px] tracking-[.14em] text-[#9b9990] uppercase">Status</p><p className="mt-1 flex items-center gap-2 text-xs"><Clock3 className="size-3.5" /> {lead.stage === "new" ? "Needs first call" : "Follow-up"}</p></div><Button onClick={() => markContacted(lead._id, lead.name)} disabled={pending === lead._id} className="rounded-full bg-[#252523] text-xs text-[#f3f0e9] hover:bg-[#454541]"><Check className="mr-2 size-3.5" />{pending === lead._id ? "Saving…" : "Log call"}</Button></div>)}</div>}</div></section></main>;
}
