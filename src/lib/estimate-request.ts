export const ESTIMATE_REQUEST_EVENT = "lovemeafter:open-estimate-request";

export type RequestedVisit = { date: string; dateLabel: string; time: string };

export function openEstimateRequest(service?: string, requestedVisit?: RequestedVisit) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<{ service?: string; requestedVisit?: RequestedVisit }>(ESTIMATE_REQUEST_EVENT, {
      detail: { service, requestedVisit },
    }),
  );
}
