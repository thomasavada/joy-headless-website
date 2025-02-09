import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Joy",
  description: "Choose the perfect plan for your business",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 