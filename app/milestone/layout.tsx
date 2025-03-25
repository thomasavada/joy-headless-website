import { Metadata } from "next";
import { ForcedTheme } from "@/components/ForcedTheme";

export const metadata: Metadata = {
  title: "Milestone Program - Joy",
  description: "Empower brands to gamify the customer journey, boosting retention, sales, cross-selling, and engagement",
};

export default function MilestoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ForcedTheme theme="dark">{children}</ForcedTheme>;
}