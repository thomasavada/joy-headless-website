import type {Metadata} from "next";
import {Bai_Jamjuree, Inter, Poppins} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Navbar} from "@/components/layout/navbar";
import {ThemeProvider} from "next-themes";
import {FooterSection} from "@/components/layout/sections/footer";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bai-jamjuree",
});

export const metadata: Metadata = {
  title: 'Joy',
  description: 'Joy Application',
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/favicon.ico',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background dark:bg-background-dark transition-colors",
        inter.className,
        poppins.variable,
        baiJamjuree.variable,
        "font-sans"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
