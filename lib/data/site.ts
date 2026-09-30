/**
 * Site-wide constants. Contact details below are PLACEHOLDERS — swap in
 * real numbers/addresses/handles before launch (build spec §20).
 */
export const site = {
  name: "Scoutr",
  tagline: "360° tours for listings that sell.",
  description:
    "Scoutr helps property sellers sell with 360° virtual tours, dollhouse views, measured floor plans, photography, and video.",
  email: "hello@scoutr.example",
  phone: "+254 700 000 000",
  whatsapp: "254700000000",
  serviceArea: "Nairobi & coastal Kenya — available for travel nationwide",
  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
];

// Fuller link list for the footer — Pricing/Contact were dropped from the
// header nav but stay reachable here.
export const footerNav = [...mainNav, { label: "Pricing", href: "/pricing" }, { label: "Contact", href: "/contact" }];

export const propertyTypes = [
  "Residential",
  "Commercial",
  "Hotel",
  "Airbnb / Short-Term Rental",
  "Development",
  "Other",
] as const;

export const servicesRequired = [
  "360° Virtual Tour",
  "Dollhouse / 3D View",
  "Interactive Floor Plan",
  "Photography",
  "Video",
  "Not sure — advise me",
] as const;
