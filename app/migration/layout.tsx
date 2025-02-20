import {Metadata} from "next";
import { ForcedTheme } from "../../components/ForcedTheme";

export const metadata: Metadata = {
  title: "Migration - Joy",
  description: "Easily migrate your loyalty program to Joy",
};

export default function MigrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ForcedTheme theme="dark">{children}</ForcedTheme>;
}
