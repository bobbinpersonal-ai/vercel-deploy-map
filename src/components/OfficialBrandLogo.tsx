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
  const [loadedSource, setLoadedSource] = useState("");
  const sources = [
    `https://${domain}/favicon.svg`,
    `https://${domain}/favicon.ico`,
    `https://${domain}/favicon.png`,
    `https://${domain}/apple-touch-icon.png`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ];
  const source = sources[sourceIndex];
  const initials = brand
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const imageIsReady = Boolean(source && loadedSource === source);

  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`${className} brand-logo-frame relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md`}
    >
      {!imageIsReady && (
        <span className="brand-logo-fallback flex h-full w-full items-center justify-center text-[.58em] font-extrabold leading-none tracking-[-.04em]">
          {initials}
        </span>
      )}
      {source && (
        <img
          key={source}
          src={source}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-contain p-0.5 transition-opacity ${imageIsReady ? "opacity-100" : "opacity-0"}`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoadedSource(source)}
          onError={() => setSourceIndex((index) => index + 1)}
        />
      )}
    </span>
  );
}
