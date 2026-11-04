import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "Raphbee — E-commerce & Automation",
  description:
    "Raphbee builds practical e-commerce experiences, web systems, business automations and AI integrations.",
  metadataBase: new URL("https://www.raphbee.com"),
  openGraph: {
    title: "Raphbee — E-commerce & Automation",
    description: "Building digital systems that help businesses grow.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
