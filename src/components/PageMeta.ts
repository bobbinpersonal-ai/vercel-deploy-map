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
    if (canonical) {
      const url = `${window.location.origin}${path ?? window.location.pathname}`;
      canonical.setAttribute("href", url);
      setContent('meta[property="og:url"]', url);
    }

    return () => {
      document.title = previousTitle;
      if (description && descriptionTag) descriptionTag.setAttribute("content", previousDescription);
      if (canonical && previousCanonical) canonical.setAttribute("href", previousCanonical);
    };
  }, [title, description, path]);
}
