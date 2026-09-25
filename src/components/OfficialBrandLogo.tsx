import { useState } from "react";

type OfficialBrandLogoProps = {
  brand: string;
  domain: string;
  alt?: string;
  className?: string;
};

export function OfficialBrandLogo({
  brand,
  domain,
  alt = "",
  className = "size-7",
}: OfficialBrandLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = [
    `https://${domain}/favicon.svg`,
    `https://${domain}/favicon.ico`,
    `https://${domain}/favicon.png`,
    `https://${domain}/apple-touch-icon.png`,
  ];
  const initials = brand
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (sourceIndex >= sources.length) {
    return (
      <span
        role="img"
        aria-label={alt || `${brand} logo`}
        className={`${className} flex shrink-0 items-center justify-center rounded-md bg-[#f3f5ed] text-[10px] font-bold tracking-tight text-[#526047]`}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      key={sources[sourceIndex]}
      src={sources[sourceIndex]}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={`${className} shrink-0 object-contain`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setSourceIndex((index) => index + 1)}
    />
  );
}
