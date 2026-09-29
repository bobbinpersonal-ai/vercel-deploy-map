import type { SVGProps } from "react";

/** A house-shaped mosaic mark with warm roof tiles and blue exterior panels. */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mosaic house logo"
      className={className}
      {...props}
    >
      <path d="M14 53 50 24 86 53V92H14V53Z" fill="#174f8d" stroke="#fffaf0" strokeWidth="3" strokeLinejoin="round" />
      <path d="m15 54 13-11 13 9-14 15-13-2Z" fill="#438bd0" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m31 42 14-11 11 10-13 13-15-2Z" fill="#0b3f78" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m57 42 12-9 15 14-12 13-15-8Z" fill="#2b6eaf" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m16 69 13-1 12 12-8 11H16Z" fill="#2b6eaf" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m31 68 13-14 11 1 1 14-15 11Z" fill="#438bd0" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m58 56 12 5 14-10v18L70 73 56 69Z" fill="#0b3f78" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m43 80 13-10 14 4 7 18H40Z" fill="#2b6eaf" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m4 46 46-39 46 39-10 11-36-30-36 30L4 46Z" fill="#f2c77b" stroke="#fffaf0" strokeWidth="3" strokeLinejoin="round" />
      <path d="m7 44 15-13 13 9-19 16Z" fill="#ffdfa0" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m25 29 16-14 8 13-13 12Z" fill="#edc27b" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m52 28 9-14 15 13-12 13Z" fill="#ffdfa0" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m67 42 12-13 15 16-11 11Z" fill="#edc27b" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m42 51 8-10 9 10v12l-9 8-8-8Z" fill="#f2c77b" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 54h10v10H20zM70 54h10v10H70z" fill="#ffdfa0" stroke="#fffaf0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 92V72h20v20" fill="#0b3f78" stroke="#fffaf0" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="55" cy="82" r="1.7" fill="#f2c77b" />
    </svg>
  );
}

/** Compact mosaic-house and website-address lockup. */
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
  return (
    <span className={`flex items-center gap-2.5 ${ink} ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className="brand-wordmark whitespace-nowrap text-base font-semibold tracking-tight sm:text-lg">
        lovemeafter.com
      </span>
      {!compact && <span className="sr-only">LoveMeAfter home improvement</span>}
    </span>
  );
}
