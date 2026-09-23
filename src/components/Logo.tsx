import type { SVGProps } from "react";

/**
 * The LoveMeAfter mark: a framed house under construction, a hammer across the
 * roofline, and a heart inside the home. Drawn with currentColor so it can be
 * rendered black on light surfaces or light on dark surfaces.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LoveMeAfter logo"
      className={className}
      {...props}
    >
      {/* Roofline */}
      <path
        d="M5.5 30 32 8.5 58.5 30"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Walls */}
      <path
        d="M11.5 26.5V56.5h41V26.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Exposed studs — the house is still being built */}
      <path
        d="M22.5 56.5V45M32 56.5V45M41.5 56.5V45"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Heart in the home */}
      <path
        d="M32 42.5c-7.2-5.4-10.8-9.1-10.8-12.7a4.8 4.8 0 0 1 10.8-1.9 4.8 4.8 0 0 1 10.8 1.9c0 3.6-3.6 7.3-10.8 12.7Z"
        fill="currentColor"
      />
      {/* Hammer across the roofline */}
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
      <LogoMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-[-.02em]">LoveMeAfter</span>
        {!compact && (
          <span className={`mt-0.5 text-[9px] font-semibold tracking-[.16em] uppercase ${sub}`}>
            BUILDERS
          </span>
        )}
      </span>
    </span>
  );
}
