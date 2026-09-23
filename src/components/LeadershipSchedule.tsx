import { useMemo, useState } from "react";
import { CalendarDays, Check, Clock3, X } from "lucide-react";

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

export type ConsultationSlot = {
  date: string;
  dateLabel: string;
  time: string;
};

type DayOption = { value: string; label: string };
type LeadershipScheduleProps = {
  onConfirm?: (slot: ConsultationSlot) => void;
  onCancel?: () => void;
};

const formatTime = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix}`;
};

const formatSlot = (start: number, end: number) => `${formatTime(start)}–${formatTime(end)}`;

const unavailableSlotsFor = (date: string) => {
  let hash = 0;
  for (const character of date) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  const first = Math.abs(hash) % TIME_SLOTS.length;
  const second = Math.abs(hash * 17 + 11) % TIME_SLOTS.length;
  return new Set([first, second === first ? (second + 5) % TIME_SLOTS.length : second]);
};

function nextWeekdays(count: number): DayOption[] {
  const days: DayOption[] = [];
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

export function LeadershipSchedule({ onConfirm, onCancel }: LeadershipScheduleProps) {
  const days = useMemo(() => nextWeekdays(10), []);
  const [date, setDate] = useState(days[0]?.value ?? "");
  const [time, setTime] = useState("");
  const unavailable = unavailableSlotsFor(date);
  const selectedDay = days.find((day) => day.value === date);

  return (
    <section className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#172019]/95 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl" aria-labelledby="consultation-slot-title">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.17em] text-[#d5ec77] uppercase"><CalendarDays className="size-4" /> In-home design visit</p>
          <h2 id="consultation-slot-title" className="mt-2 text-2xl font-semibold tracking-[-.04em]">Choose a date &amp; time</h2>
          <p className="mt-1 text-xs text-white/60">45 minutes · weekdays · 7:00 AM–8:00 PM</p>
        </div>
        {onCancel && <button type="button" onClick={onCancel} aria-label="Close date and time picker" className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[.06] text-white/75 transition hover:border-white/30 hover:bg-white/10 hover:text-white"><X className="size-4" /></button>}
      </div>

      <div className="px-5 py-5 sm:px-6">
        <p className="text-[10px] font-semibold tracking-[.14em] text-white/55 uppercase">Select a weekday</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {days.map((day) => (
            <button key={day.value} type="button" onClick={() => { setDate(day.value); setTime(""); }} aria-pressed={date === day.value} className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${date === day.value ? "border-[#d5ec77] bg-[#d5ec77] text-[#1d211d]" : "border-white/10 bg-white/[.04] text-white/75 hover:border-white/25 hover:bg-white/[.08]"}`}>
              {day.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold tracking-[.14em] text-white/55 uppercase"><Clock3 className="size-3.5" /> Available 45-minute windows</div>
        <div className="mt-2 grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => {
            const isUnavailable = unavailable.has(slot.index);
            const label = formatSlot(slot.start, slot.end);
            return (
              <button key={label} type="button" disabled={isUnavailable} onClick={() => setTime(label)} aria-pressed={time === label} className={`rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition ${isUnavailable ? "cursor-not-allowed border-white/[.06] bg-white/[.02] text-white/25 line-through" : time === label ? "border-[#d5ec77] bg-[#d5ec77]/15 text-[#e7f5aa] ring-1 ring-[#d5ec77]/35" : "border-white/10 bg-white/[.04] text-white/75 hover:border-[#d5ec77]/60 hover:bg-white/[.08]"}`}>
                {isUnavailable ? "Unavailable" : label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/10 px-5 py-4 sm:px-6">
        <p className="mb-3 min-h-4 text-xs text-white/60">{time && selectedDay ? `Selected: ${selectedDay.label} · ${time}` : "Choose a day and an available time to continue."}</p>
        <button type="button" disabled={!time || !selectedDay} onClick={() => {
          if (!selectedDay) return;
          const slot = { date, dateLabel: selectedDay.label, time };
          onConfirm?.(slot);
        }} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d5ec77] px-5 text-sm font-semibold text-[#1d211d] transition hover:bg-[#e5f795] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40">
          <Check className="size-4" /> {onConfirm ? "Use this appointment time" : "Confirm this requested time"}
        </button>

      </div>
    </section>
  );
}
