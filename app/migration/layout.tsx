import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migration - Joy",
  description: "Easily migrate your loyalty program to Joy",
};

export default function MigrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 