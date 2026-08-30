import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InteractionTool — Interactive calculators for real-world decisions",
    template: "%s | InteractionTool",
  },
  description:
    "Interactive decision tools that help you compare options, uncover hidden costs, find break-even points and test scenarios.",
  openGraph: {
    type: "website",
    siteName: "InteractionTool",
    title: "InteractionTool — Interactive calculators for real-world decisions",
    description:
      "Compare options, uncover hidden costs, find break-even points and test real-world scenarios.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
