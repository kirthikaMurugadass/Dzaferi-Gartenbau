import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/icon.jpeg",
  },
  title: {
    default: "Dzaferi-Gartenbau | Premium Garden Landscaping Zurich",
    template: "%s | Dzaferi-Gartenbau",
  },
  description:
    "Expert garden construction, maintenance, and property services across the Zurich region. Premium landscaping since day one.",
  keywords: ["garden", "landscaping", "Zurich", "Gartenbau", "maintenance"],
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
