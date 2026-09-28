import type { SVGProps } from "react";

/**
 * The LoveMeAfter mark: a spare house silhouette with a clean, architectural
 * entry and windows. Drawn with currentColor for flexible use.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LoveMeAfter Builders logo"
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
      <path d="M19 35h8v8h-8zM37 35h8v8h-8z" fill="currentColor" opacity="0.8" />
      <path d="M24 56V45h16v11" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" />
      <path d="M39 27 43 9l6 4-4 17" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="round" />
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
  const ink = tone === "black" ? "text-[#252923]" : "text-white";
  const sub = tone === "black" ? "text-[#6b7368]" : "text-white/65";
  return (
    <span className={`flex items-center gap-2.5 ${ink} ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="brand-wordmark whitespace-nowrap text-lg font-bold tracking-[.025em] sm:text-xl">LOVEMEAFTER</span>
        {!compact && (
          <span className={`mt-1 text-[9px] font-semibold tracking-[.16em] uppercase ${sub}`}>
            BUILDERS
          </span>
        )}
      </span>
    </span>
  );
}
