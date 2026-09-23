import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3, Palette } from "lucide-react";

const OPTIONS = [
  ["Design consultant · in-home consultation", "Bring your ideas, measurements, and inspiration. A design consultant can help shape layout, materials, finishes, and a brief for our national design team."],
] as const;

const PROJECT_TYPES = [
  "Roofing",
  "Siding & exterior",
  "Windows & doors",
  "Kitchen",
  "Bathroom",
  "Flooring & tile",
  "Deck, patio & fencing",
  "HVAC, plumbing & electrical",
  "Lighting",
  "Solar & backup power",
  "Multiple projects",
  "Not sure yet",
] as const;

const PRODUCT_PREFERENCES = [
  "GAF or Owens Corning roofing",
  "Tyvek weather protection",
  "Alside or James Hardie siding",
  "Andersen, Pella, Marvin or Milgard windows",
  "Trex, TimberTech or Fiberon decking",
  "CertainTeed or Trex fencing",
  "Kohler, Moen or Delta fixtures",
  "Cambria, Caesarstone or Silestone countertops",
  "Carrier, Trane, Lennox or Mitsubishi HVAC",
  "Lutron, Kichler or WAC lighting",
  "Enphase, SolarEdge or Qcells solar",
] as const;

const CONSULTATION_MINUTES = 45;
const START_OF_DAY = 7 * 60;
const END_OF_DAY = 20 * 60;
const TIME_SLOTS = Array.from(
  { length: Math.floor((END_OF_DAY - START_OF_DAY - CONSULTATION_MINUTES) / CONSULTATION_MINUTES) + 1 },
  (_, index) => {
    const start = START_OF_DAY + index * CONSULTATION_MINUTES;
    return { index, start, end: start + CONSULTATION_MINUTES };
  },
);

const formatTime = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
};

const formatSlot = (start: number, end: number) => `${formatTime(start)}–${formatTime(end)}`;

/** Stable availability keeps a few appointments unavailable without changing on every render. */
const unavailableSlotsFor = (date: string) => {
  let hash = 0;
  for (const character of date) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  const first = Math.abs(hash) % TIME_SLOTS.length;
  const second = (Math.abs(hash * 17 + 11) % TIME_SLOTS.length);
  return new Set([first, second === first ? (second + 5) % TIME_SLOTS.length : second]);
};

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
  const appointmentType = OPTIONS[0][0];
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0]);
  const [date, setDate] = useState(days[0]?.value ?? "");
  const [time, setTime] = useState(() => {
    const firstDay = days[0]?.value ?? "";
    const unavailable = unavailableSlotsFor(firstDay);
    const firstAvailable = TIME_SLOTS.find((slot) => !unavailable.has(slot.index)) ?? TIME_SLOTS[0];
    return formatSlot(firstAvailable.start, firstAvailable.end);
  });
  const [submitted, setSubmitted] = useState(false);

  const scheduleRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      "Hello LoveMeAfter team,",
      "",
      `I would like to request: ${appointmentType}`,
      `Preferred day: ${formatDate(date)}`,
      `Preferred time: ${time} (${CONSULTATION_MINUTES}-minute consultation)`,
      `Project type: ${projectType}`,
      `Product preferences: ${data.getAll("productPreferences").map(String).join(", ") || "No preference selected / homeowner would like guidance"}`,
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
    <section id="schedule" className={`rounded-[1.75rem] border p-6 sm:p-8 ${surface}`}>
      <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-[.16em] uppercase ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`}>
            <CalendarDays className="size-4" /> Book your design consultation
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-[.98] tracking-[-.045em] sm:text-4xl">Book a useful conversation, not a vague callback.</h2>
          <p className={`mt-4 text-sm leading-6 ${muted}`}>
Choose an in-home appointment with a LoveMeAfter design consultant, select a 45-minute window between 7:00 AM and 8:00 PM, and send the request directly to <strong className={dark ? "text-white" : "text-[#1d211d]"}>hello@lovemeafter.com</strong>. The design team will reply with the confirmed appointment.
          </p>
          <div className={`mt-6 border-t pt-5 ${dark ? "border-white/15" : "border-[#1d211d]/10"}`}>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[.12em] uppercase"><Clock3 className={`size-4 ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`} /> What to expect</p>
            <ul className={`mt-3 space-y-2 text-xs leading-5 ${muted}`}>
              <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#71803d]" /> No obligation and no manufactured urgency.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#71803d]" /> Bring your questions, photos, quotes, or concerns.</li>
              <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#71803d]" /> Consultations are 45 minutes; a few slots are held back each day so the team can handle active projects.</li>
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
              <p className="mb-2 text-xs font-semibold tracking-[.12em] uppercase">Appointment type</p>
              <div className={`flex items-start gap-3 rounded-xl border p-3 ${dark ? "border-[#d5ec77] bg-[#d5ec77]/10" : "border-[#71803d] bg-[#eaf0d0]"}`}>
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><Palette className="size-3.5" /></span>
                <span><span className="block text-sm font-semibold">{OPTIONS[0][0]}</span><span className={`mt-1 block text-xs leading-5 ${muted}`}>{OPTIONS[0][1]}</span></span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold">Project type<select name="projectType" value={projectType} onChange={(event) => setProjectType(event.target.value)} className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm font-medium outline-none focus:border-[#71803d] ${field}`}>{PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="text-xs font-semibold">Preferred day<select value={date} onChange={(event) => { const nextDate = event.target.value; const unavailable = unavailableSlotsFor(nextDate); const firstAvailable = TIME_SLOTS.find((slot) => !unavailable.has(slot.index)) ?? TIME_SLOTS[0]; setDate(nextDate); setTime(formatSlot(firstAvailable.start, firstAvailable.end)); }} className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm font-medium outline-none focus:border-[#71803d] ${field}`}>{days.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}</select></label>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold">Preferred time <span className={`font-normal ${muted}`}>(45 minutes · 7 AM–8 PM)</span></p>
                <div className="mt-1.5 grid max-h-44 grid-cols-2 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-3">
                  {TIME_SLOTS.map((slot) => {
                    const unavailable = unavailableSlotsFor(date).has(slot.index);
                    const label = formatSlot(slot.start, slot.end);
                    return <button key={label} type="button" disabled={unavailable} onClick={() => setTime(label)} aria-pressed={time === label} className={`rounded-lg border px-2 py-2 text-[11px] font-semibold transition ${unavailable ? (dark ? "cursor-not-allowed border-white/10 bg-white/[.02] text-white/30 line-through" : "cursor-not-allowed border-[#1d211d]/8 bg-[#eceae4] text-[#9ca39a] line-through") : time === label ? (dark ? "border-[#d5ec77] bg-[#d5ec77] text-[#1d211d]" : "border-[#71803d] bg-[#eaf0d0] text-[#1d211d]") : (dark ? "border-white/12 bg-white/[.04] text-white/75 hover:border-white/35" : "border-[#1d211d]/10 bg-[#f7f5f0] text-[#4f5a4d] hover:border-[#71803d]/60")}`}>{unavailable ? "Unavailable" : label}</button>;
                  })}
                </div>
                <p className={`mt-1.5 text-[10px] ${muted}`}>Times shown are requested windows; the team confirms the final appointment by email.</p>
              </div>
            </div>
            <fieldset className={`rounded-xl border p-3 ${dark ? "border-white/12 bg-white/[.03]" : "border-[#1d211d]/10 bg-[#f7f5f0]"}`}>
              <legend className="px-1 text-xs font-semibold">Product preferences <span className={`font-normal ${muted}`}>(optional — check any you already have in mind)</span></legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {PRODUCT_PREFERENCES.map((preference) => (
                  <label key={preference} className={`flex cursor-pointer items-start gap-2 rounded-lg border px-2.5 py-2 text-xs leading-4 transition ${dark ? "border-white/10 hover:border-white/30" : "border-[#1d211d]/8 hover:border-[#71803d]/50"}`}>
                    <input type="checkbox" name="productPreferences" value={preference} className="mt-0.5 accent-[#71803d]" />
                    <span>{preference}</span>
                  </label>
                ))}
              </div>
              <p className={`mt-2 text-[10px] ${muted}`}>No product knowledge is required. Your consultant can explain comparable options, availability, pricing, and manufacturer warranties.</p>
            </fieldset>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Your name" aria-label="Your name" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
              <input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="email" required type="email" placeholder="Email address" aria-label="Email address" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
              <input name="location" required placeholder="City & state" aria-label="City and state" className={`h-11 rounded-xl border px-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
            </div>
            <textarea name="project" rows={3} placeholder="What would you like the rep to understand before the visit?" aria-label="Project details" className={`w-full resize-none rounded-xl border px-3 py-3 text-sm outline-none focus:border-[#71803d] ${field}`} />
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d5ec77] px-5 text-sm font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">Request this 45-minute appointment <ArrowUpRight className="ml-2 size-4" /></button>
          </form>
        )}
      </div>
    </section>
  );
}
