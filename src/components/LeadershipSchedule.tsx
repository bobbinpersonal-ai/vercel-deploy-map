import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3, Home, Mail } from "lucide-react";

const OPTIONS = [
  ["In-home project visit", "Have a senior representative see the property, understand the goal, and help decide what should happen first."],
  ["15-minute trust review", "Questions about legitimacy, scope, insurance, process, or how we coordinate the work."],
  ["Project strategy conversation", "A complex renovation, multi-trade plan, property portfolio, or financing decision."],
] as const;

const TIMES = ["9:00–10:00 AM", "11:00 AM–12:00 PM", "1:00–2:00 PM", "3:00–4:00 PM"];

function nextWeekdays(count: number) {
  const days: { value: string; label: string }[] = [];
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  while (days.length < count) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    days.push({
      value: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
    });
  }
  return days;
}

const formatDate = (value: string) => {
  if (!value) return "Not selected";
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
};

export function LeadershipSchedule({ dark = false }: { dark?: boolean }) {
  const days = useMemo(() => nextWeekdays(4), []);
  const [appointmentType, setAppointmentType] = useState(OPTIONS[0][0]);
  const [date, setDate] = useState(days[0]?.value ?? "");
  const [time, setTime] = useState(TIMES[0]);
  const [submitted, setSubmitted] = useState(false);

  const scheduleRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      "Hello LoveMeAfter team,",
      "",
      `I would like to request: ${appointmentType}`,
      `Preferred day: ${formatDate(date)}`,
      `Preferred time: ${time}`,
      "",
      `Name: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `City/state: ${String(data.get("location") ?? "")}`,
      `Project or question: ${String(data.get("project") ?? "")}`,
      "",
      "Please reply with the confirmed time. Thank you.",
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:hello@lovemeafter.com?subject=${encodeURIComponent(`${appointmentType} request · ${formatDate(date)}`)}&body=${encodeURIComponent(body)}`;
  };

  const surface = dark ? "border-white/15 bg-[#202a20] text-white" : "border-[#1d211d]/10 bg-white text-[#1d211d]";
  const muted = dark ? "text-white/68" : "text-[#62695f]";
  const field = dark ? "border-white/15 bg-white/[.06] text-white placeholder:text-white/45" : "border-[#1d211d]/12 bg-[#f7f5f0] text-[#1d211d] placeholder:text-[#8b9288]";

  return (
    <section className={`rounded-[1.75rem] border p-6 sm:p-8 ${surface}`}>
      <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-[.16em] uppercase ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`}>
            <CalendarDays className="size-4" /> Talk with senior management
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-[.98] tracking-[-.045em] sm:text-4xl">Book a useful conversation, not a vague callback.</h2>
          <p className={`mt-4 text-sm leading-6 ${muted}`}>
            Choose an in-home visit or a short review, tell us when you are available, and send the request directly to <strong className={dark ? "text-white" : "text-[#1d211d]"}>hello@lovemeafter.com</strong>. A senior team member will reply with a confirmed time.
          </p>
          <div className={`mt-6 border-t pt-5 ${dark ? "border-white/15" : "border-[#1d211d]/10"}`}>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[.12em] uppercase"><Clock3 className={`size-4 ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`} /> What to expect</p>
            <ul className={`mt-3 space-y-2 text-xs leading-5 ${muted}`}>
              <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#71803d]" /> No obligation and no manufactured urgency.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#71803d]" /> Bring your questions, photos, quotes, or concerns.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#71803d]" /> The time is confirmed by email; this form does not claim a live calendar slot.</li>
            </ul>
          </div>
        </div>

        {submitted ? (
          <div className={`rounded-2xl border p-6 ${dark ? "border-[#d5ec77]/35 bg-[#d5ec77]/10" : "border-[#71803d]/25 bg-[#eaf0d0]"}`}>
            <Check className="size-6 text-[#71803d]" />
            <h3 className="mt-5 text-xl font-semibold">Your request is ready to send.</h3>
            <p className={`mt-2 text-sm leading-6 ${muted}`}>Your email app should now be addressed to hello@lovemeafter.com. Send the message and the team will confirm the appointment.</p>
            <button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-xs font-semibold text-[#71803d] underline underline-offset-4">Edit my request</button>
          </div>
        ) : (
          <form onSubmit={scheduleRequest} className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[.12em] uppercase">What would be most useful?</p>
              <div className="grid gap-2">
                {OPTIONS.map(([title, detail]) => (
                  <button key={title} type="button" onClick={() => setAppointmentType(title)} className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${appointmentType === title ? (dark ? "border-[#d5ec77] bg-[#d5ec77]/10" : "border-[#71803d] bg-[#eaf0d0]") : (dark ? "border-white/12 bg-white/[.03] hover:border-white/35" : "border-[#1d211d]/10 bg-[#f7f5f0] hover:border-[#71803d]/60")}`}>
                    <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${appointmentType === title ? "bg-[#d5ec77] text-[#1d211d]" : dark ? "bg-white/10 text-white/65" : "bg-white text-[#71803d]"}`}>{title.startsWith("In-home") ? <Home className="size-3.5" /> : <Mail className="size-3.5" />}</span>
                    <span><span className="block text-sm font-semibold">{title}</span><span className={`mt-1 block text-xs leading-5 ${muted}`}>{detail}</span></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold">Preferred day<select value={date} onChange={(event) => setDate(event.target.value)} className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm font-medium outline-none focus:border-[#71803d] ${field}`}>{days.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}</select></label>
              <label className="text-xs font-semibold">Preferred time<select value={time} onChange={(event) => setTime(event.target.value)} className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm font-medium outline-none focus:border-[#71803d] ${field}`}>{TIMES.map((option) => <option key={option}>{option}</option>)}</select></label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Your name" aria-label="Your name" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
              <input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="email" required type="email" placeholder="Email address" aria-label="Email address" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
              <input name="location" required placeholder="City & state" aria-label="City and state" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
            </div>
            <textarea name="project" rows={3} placeholder="What would you like the rep to understand before the visit?" aria-label="Project details" className={`w-full resize-none rounded-xl border px-3 py-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d5ec77] px-5 text-sm font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">Request this time <ArrowUpRight className="ml-2 size-4" /></button>
          </form>
        )}
      </div>
    </section>
  );
}
