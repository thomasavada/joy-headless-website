import { Metadata } from "next";
import { ForcedTheme } from "@/components/ForcedTheme";

export const metadata: Metadata = {
  title: "VIP Tiers - Joy",
  description: "Create personalized VIP tiers to reward your most valuable customers",
};

export default function VIPTiersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ForcedTheme theme="dark">{children}</ForcedTheme>;
}