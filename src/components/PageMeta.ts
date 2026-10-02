import { useEffect } from "react";

/** Keeps generated descriptions inside the length search results actually show. */
export function clip(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/[\s,.;:]+$/, "")}…`;
}

function setContent(selector: string, content: string) {
  const tag = document.querySelector(selector);
  if (tag) tag.setAttribute("content", content);
}

/**
 * Route-level document metadata.
 *
 * LoveMeAfter is a client-rendered single page app, so every URL is served the
 * same static `<head>`. Running this hook per route gives each page its own
 * title, description, canonical URL and social preview text instead of one
 * generic site-wide blurb.
 */
export function usePageMeta(title: string, description?: string, path?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content") ?? "";
    if (description && descriptionTag) descriptionTag.setAttribute("content", description);

    if (description) {
      setContent('meta[property="og:description"]', description);
      setContent('meta[name="twitter:description"]', description);
    }
    setContent('meta[property="og:title"]', title);
    setContent('meta[name="twitter:title"]', title);

    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    const previousOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null;
    const previousOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? null;
    const previousOgImageAlt = document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content") ?? null;
    const previousTwitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute("content") ?? null;
    if (canonical) {
      const url = path?.startsWith("https://") || path?.startsWith("http://")
        ? path
        : `${window.location.origin}${path ?? window.location.pathname}`;
      canonical.setAttribute("href", url);
      setContent('meta[property="og:url"]', url);
    }
    if (path === "/" && canonical) {
      const heroImage = "https://images.pexels.com/photos/5524336/pexels-photo-5524336.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop";
      setContent('meta[property="og:image"]', heroImage);
      setContent('meta[property="og:image:alt"]', "Illustrative residential exterior photo from Pexels; not a LoveMeAfter project");
      setContent('meta[name="twitter:image"]', heroImage);
    }

    return () => {
      document.title = previousTitle;
      if (description && descriptionTag) descriptionTag.setAttribute("content", previousDescription);
      if (canonical && previousCanonical) canonical.setAttribute("href", previousCanonical);
      if (previousOgUrl) setContent('meta[property="og:url"]', previousOgUrl);
      if (previousOgImage) setContent('meta[property="og:image"]', previousOgImage);
      if (previousOgImageAlt) setContent('meta[property="og:image:alt"]', previousOgImageAlt);
      if (previousTwitterImage) setContent('meta[name="twitter:image"]', previousTwitterImage);
    };
  }, [title, description, path]);
}
