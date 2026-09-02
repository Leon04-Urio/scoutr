import type { LucideIcon } from "lucide-react";
import { Box, Camera, Ruler, Video, RotateCw, Layers } from "lucide-react";

/**
 * "What We Do" — mirrors the future `services` table (build spec §11).
 * Static here in Phase 1; moves to Supabase alongside pricing later.
 */
export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: RotateCw,
    title: "360° Virtual Tours",
    description:
      "Room-to-room navigation with hotspots, built so a visitor can walk the property on their own screen.",
  },
  {
    icon: Box,
    title: "Dollhouse & 3D Views",
    description:
      "An interactive 3D model of the whole property, rotatable and zoomable, showing how every room connects.",
  },
  {
    icon: Ruler,
    title: "Interactive Floor Plans",
    description:
      "Measured, zoomable floor plans that jump straight into the matching 360° scene.",
  },
  {
    icon: Camera,
    title: "Professional Photography",
    description:
      "Corrected, graded, and delivered at listing-ready resolution — for the platforms that don't take 360°.",
  },
  {
    icon: Video,
    title: "Property Video",
    description:
      "Short-form walkthrough and highlight video, cut for listings, social, and paid campaigns.",
  },
  {
    icon: Layers,
    title: "Digital Showcases",
    description:
      "Every deliverable combined into one shareable, embeddable page built for the property itself.",
  },
];
