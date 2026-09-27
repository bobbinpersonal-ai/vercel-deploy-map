import type { SVGProps } from "react";

/**
 * The LoveMeAfter mark: a framed home with an architectural entry, windows,
 * and a hammer across the roofline. Drawn with currentColor for flexible use.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LoveMeAfter home and hammer logo"
      className={className}
      {...props}
    >
      <path
        d="M5.5 30 32 8.5 58.5 30"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 26.5V56.5h41V26.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 56.5V45M41.5 56.5V45"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <rect x="27" y="36" width="10" height="20.5" rx="1.5" stroke="currentColor" strokeWidth="3.2" />
      <circle cx="34" cy="46.5" r="1" fill="currentColor" />
      <path d="M17.5 35.5h5v5h-5zM41.5 35.5h5v5h-5z" fill="currentColor" opacity="0.8" />
      <g transform="rotate(-37 49 15)">
        <rect x="38" y="8" width="21" height="12.5" rx="3.5" fill="currentColor" />
        <rect x="45.8" y="20" width="6.4" height="25" rx="3.2" fill="currentColor" />
      </g>
    </svg>
  );
}

/**
 * The full lockup. `tone="black"` is the brand default; use `tone="light"` on
 * dark headers. `compact` hides the BUILDERS descriptor for tight bars.
 */
export function Logo({
  tone = "black",
  compact = false,
  className = "",
}: {
  tone?: "black" | "light";
  compact?: boolean;
  className?: string;
}) {
  const ink = tone === "black" ? "text-black" : "text-white";
  const sub = tone === "black" ? "text-[#6b7368]" : "text-white/60";
  return (
    <span className={`flex items-center gap-2.5 ${ink} ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="brand-wordmark whitespace-nowrap text-lg font-black tracking-[.055em] sm:text-xl">LOVEMEAFTER</span>
        {!compact && (
          <span className={`mt-1 text-[9px] font-bold tracking-[.2em] uppercase ${sub}`}>
            BUILDERS
          </span>
        )}
      </span>
    </span>
  );
}
