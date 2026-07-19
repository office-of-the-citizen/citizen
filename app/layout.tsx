import type { Metadata, Viewport } from "next";

import "./globals.css";
import { BottomNav } from "@/components/shell/BottomNav";

/**
 * Citizen shell. CAOS remains invisible: the product is the citizen's
 * community, not the operating system that guarantees it.
 */
export const metadata: Metadata = {
  title: {
    default: "Your Local Government",
    template: "%s — Your Local Government",
  },
  description:
    "Discover Nigeria, your state, and the constitutional profile of your Local Government.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#095c33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
