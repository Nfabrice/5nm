import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "5 N&M · Apartments in Kigali, Rwanda",
  description:
    "Thoughtfully designed, fully furnished apartments for short and medium stays in Kigali, Rwanda.",
  openGraph: {
    title: "5 N&M · A better way to stay.",
    description: "Thoughtfully designed apartments for comfortable stays in Rwanda.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
