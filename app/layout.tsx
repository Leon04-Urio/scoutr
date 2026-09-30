import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/*
          Loaded as a plain stylesheet link rather than next/font/google:
          next/font fetches font files at *build* time, which fails in
          network-restricted build environments (this was verified against
          one). A <link> tag fetches at *request* time in the visitor's
          browser instead, which is universally supported and has no build
          dependency. On Vercel (unrestricted network) this can be swapped
          for next/font/google later for the small CLS/preload benefit —
          functionally it renders identically either way.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router
            root layout with no pages/_document.js; this rule targets the
            legacy Pages Router and doesn't apply here. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Alex+Brush&family=Montserrat:wght@500;600;700&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ink text-paper">{children}</body>
    </html>
  );
}
