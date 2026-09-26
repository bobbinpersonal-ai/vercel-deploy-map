/**
 * Code-generated graphics.
 *
 * Every chart and diagram here is drawn from real data with inline SVG and the
 * site's own color tokens — no chart library, no raster images. That keeps them
 * crisp on any screen, themeable, and honest: the numbers come from props.
 */

const INK = "#f6eaf1";
const ACCENT = "#ef8eb4";
const ACCENT_LIGHT = "#ffc6dc";
const MUTED = "#b7aab5";
const GRID = "#473b48";

export type BarDatum = { label: string; value: number; note?: string };

/** Horizontal bar chart — good for percentages and cost comparisons. */
export function RoiBarChart({
  data,
  unit = "%",
  max,
  title,
  ariaLabel,
}: {
  data: BarDatum[];
  unit?: string;
  max?: number;
  title?: string;
  ariaLabel?: string;
}) {
  const ceiling = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <figure className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-white sm:p-6">
      {title && <figcaption className="text-sm font-semibold">{title}</figcaption>}
      <div
        role="img"
        aria-label={ariaLabel ?? title ?? "Bar chart"}
        className={`space-y-3 ${title ? "mt-5" : ""}`}
      >
        {data.map((datum) => {
          const width = Math.max((datum.value / ceiling) * 100, 1.5);
          return (
            <div key={datum.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-white/75">{datum.label}</span>
                <span className="text-xs font-semibold tabular-nums" style={{ color: INK }}>
                  {datum.value}
                  {unit}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full" style={{ background: "#473b48" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${width}%`, background: datum.value >= 100 ? ACCENT : ACCENT_LIGHT }}
                />
              </div>
              {datum.note && <p className="mt-1 text-[11px] leading-4 text-white/55">{datum.note}</p>}
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/** Donut chart — good for budget and cost breakdowns. */
export function CostDonut({
  data,
  title,
  centerLabel,
  ariaLabel,
}: {
  data: BarDatum[];
  title?: string;
  centerLabel?: string;
  ariaLabel?: string;
}) {
  const palette = ["#ef8eb4", "#ffc6dc", "#c884a7", "#f3a4c2", "#9c6783", "#e1b3ca"];
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const slices = data.reduce<{ datum: BarDatum; index: number; dash: number; offset: number; nextOffset: number }[]>(
    (result, datum, index) => {
      const dash = (datum.value / total) * circumference;
      const offset = result[index - 1]?.nextOffset ?? 0;
      return [...result, { datum, index, dash, offset, nextOffset: offset + dash }];
    },
    [],
  );

  return (
    <figure className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-white sm:p-6">
      {title && <figcaption className="text-sm font-semibold">{title}</figcaption>}
      <div className={`flex flex-col items-center gap-6 sm:flex-row ${title ? "mt-5" : ""}`}>
        <svg
          viewBox="0 0 140 140"
          className="size-40 shrink-0"
          role="img"
          aria-label={ariaLabel ?? title ?? "Cost breakdown chart"}
        >
          <g transform="rotate(-90 70 70)">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#473b48" strokeWidth="18" />
            {slices.map(({ datum, index, dash, offset }) => (
              <circle
                key={datum.label}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={palette[index % palette.length]}
                strokeWidth="18"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            ))}
          </g>
          {centerLabel && (
            <text
              x="70"
              y="74"
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill={INK}
            >
              {centerLabel}
            </text>
          )}
        </svg>
        <ul className="w-full space-y-2">
          {data.map((datum, index) => (
            <li key={datum.label} className="flex items-center gap-3 text-xs">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: palette[index % palette.length] }}
              />
              <span className="flex-1 text-white/75">{datum.label}</span>
              <span className="font-semibold tabular-nums text-white">
                {Math.round((datum.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/** Gantt-style timeline in days, used for project phasing education. */
export function PhaseTimeline({
  phases,
  title,
  ariaLabel,
}: {
  phases: { label: string; start: number; duration: number }[];
  title?: string;
  ariaLabel?: string;
}) {
  const totalDays = Math.max(...phases.map((p) => p.start + p.duration), 1);
  const ticks = Math.min(6, Math.max(2, Math.round(totalDays / 7)));

  return (
    <figure className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-white sm:p-6">
      {title && <figcaption className="text-sm font-semibold">{title}</figcaption>}
      <div role="img" aria-label={ariaLabel ?? title ?? "Project timeline"} className={title ? "mt-5" : ""}>
        <div className="flex gap-3">
          <div className="w-28 shrink-0 space-y-2 sm:w-36">
            {phases.map((phase) => (
              <div key={phase.label} className="flex h-7 items-center">
                <span className="truncate text-[11px] font-medium text-white/75">{phase.label}</span>
              </div>
            ))}
          </div>
          <div className="relative min-w-0 flex-1 space-y-2">
            {phases.map((phase) => (
              <div key={phase.label} className="relative h-7">
                <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: GRID }} />
                <div
                  className="absolute top-1/2 h-5 -translate-y-1/2 rounded-md"
                  style={{
                    left: `${(phase.start / totalDays) * 100}%`,
                    width: `${Math.max((phase.duration / totalDays) * 100, 3)}%`,
                    background: phase.label.toLowerCase().includes("cure") ? ACCENT_LIGHT : ACCENT,
                    opacity: 0.9,
                  }}
                />
              </div>
            ))}
            <div className="mt-1 flex justify-between text-[11px] text-white/70">
              {Array.from({ length: ticks + 1 }, (_, index) => (
                <span key={index}>{Math.round((totalDays / ticks) * index)}d</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/** Half-circle gauge for severity and risk scoring. */
export function SeverityMeter({
  value,
  label,
  caption,
  ariaLabel,
}: {
  value: number;
  label: string;
  caption?: string;
  ariaLabel?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 62;
  const circumference = Math.PI * radius;
  const filled = (clamped / 100) * circumference;
  const path = `M 20 76 A ${radius} ${radius} 0 0 1 144 76`;

  return (
    <figure className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-white sm:p-6">
      <svg viewBox="0 0 164 100" className="w-full" role="img" aria-label={ariaLabel ?? label}>
        <path d={path} fill="none" stroke="#473b48" strokeWidth="14" strokeLinecap="round" />
        <path
          d={path}
          fill="none"
          stroke={clamped >= 66 ? "#ff8f98" : clamped >= 33 ? "#ffc6dc" : ACCENT}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
        <text x="82" y="70" textAnchor="middle" fontSize="24" fontWeight="700" fill={INK}>
          {clamped}
        </text>
        <text x="82" y="86" textAnchor="middle" fontSize="9" fill={MUTED}>
          / 100
        </text>
      </svg>
      <figcaption className="mt-2">
        <p className="text-sm font-semibold">{label}</p>
        {caption && <p className="mt-1 text-xs leading-5 text-white/70">{caption}</p>}
      </figcaption>
    </figure>
  );
}

/** Stacked share bar — shows how work splits across categories. */
export function TradeShareChart({
  data,
  title,
  ariaLabel,
}: {
  data: { label: string; value: number }[];
  title?: string;
  ariaLabel?: string;
}) {
  const palette = ["#ef8eb4", "#ffc6dc", "#c884a7", "#f3a4c2", "#9c6783"];
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  return (
    <figure className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-white sm:p-6">
      {title && <figcaption className="text-sm font-semibold">{title}</figcaption>}
      <div className={title ? "mt-5" : ""}>
        <div
          role="img"
          aria-label={ariaLabel ?? title ?? "Share chart"}
          className="flex h-6 w-full overflow-hidden rounded-full"
        >
          {data.map((datum, index) => (
            <div
              key={datum.label}
              style={{ width: `${(datum.value / total) * 100}%`, background: palette[index % palette.length] }}
              title={`${datum.label}: ${Math.round((datum.value / total) * 100)}%`}
            />
          ))}
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {data.map((datum, index) => (
            <li key={datum.label} className="flex items-center gap-3 text-xs">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: palette[index % palette.length] }}
              />
              <span className="flex-1 text-white/75">{datum.label}</span>
              <span className="font-semibold tabular-nums text-white">{datum.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/** Repair-or-replace decision diagram, drawn as a flow. */
export function DecisionFlow({
  title,
  steps,
  ariaLabel,
}: {
  title?: string;
  steps: { question: string; yes: string; no: string }[];
  ariaLabel?: string;
}) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-white sm:p-6">
      {title && <figcaption className="text-sm font-semibold">{title}</figcaption>}
      <div role="img" aria-label={ariaLabel ?? title ?? "Decision diagram"} className={title ? "mt-5" : ""}>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step.question} className="grid gap-3 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-stretch">
              <div className="rounded-xl border border-white/10 bg-[#2b202d] p-3">
                <p className="text-[10px] font-semibold tracking-[.14em] text-white/50 uppercase">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5">{step.question}</p>
              </div>
              <div className="rounded-xl border border-[#ef8eb4]/20 bg-[#ef8eb4]/10 p-3">
                <p className="text-[11px] font-semibold tracking-[.14em] text-[#ffc6dc] uppercase">If yes</p>
                <p className="mt-1 text-xs leading-5 text-white/75">{step.yes}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#2b202d] p-3">
                <p className="text-[11px] font-semibold tracking-[.14em] text-white/75 uppercase">If no</p>
                <p className="mt-1 text-xs leading-5 text-white/75">{step.no}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
