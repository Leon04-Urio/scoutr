/**
 * "Trusted by" logo marquee — static placeholder client wordmarks for
 * Phase 1. Each gets a different type treatment so the strip reads like a
 * row of real distinct logos rather than one repeated font.
 */
export interface ClientLogo {
  name: string;
  font: "display" | "display-italic" | "geo" | "wordmark" | "sans-bold";
}

export const clients: ClientLogo[] = [
  { name: "Meridian", font: "display" },
  { name: "Northlane", font: "geo" },
  { name: "Solstice", font: "display-italic" },
  { name: "Harborview", font: "sans-bold" },
  { name: "Palisade", font: "wordmark" },
  { name: "Ashcroft", font: "geo" },
  { name: "Vantage", font: "display" },
  { name: "Rowan & Co.", font: "display-italic" },
];
