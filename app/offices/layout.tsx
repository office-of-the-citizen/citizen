import type { Metadata } from "next";

/**
 * Offices section layout — overrides the title template for public office
 * pages. The shell (BottomNav, DeviceShell, MotionProvider) is inherited
 * from the root layout.
 */
export const metadata: Metadata = {
  title: {
    default: "Public Offices",
    template: "%s — Public Offices",
  },
  description:
    "Explore the constitutional offices of Nigeria — Federal, State, and Local. Their roles, responsibilities, and records.",
};

export default function OfficesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
