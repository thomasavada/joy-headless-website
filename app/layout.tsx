import type { Metadata } from "next";
import { Inter, Poppins, Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { getSettings, Settings } from '@/lib/ghost';
import { FooterSection } from "@/components/layout/sections/footer";

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

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSettings() as Settings;

  return {
    metadataBase: new URL('https://joy.so'),
    title: {
      default: settings.title,
      template: `%s | ${settings.title || 'Joy'}`,
    },
    description: settings.description,
    icons: {
      icon: settings.icon || '/favicon.ico',
    },
    openGraph: {
      title: settings.title,
      description: settings.description,
      images: settings.cover_image ? [settings.cover_image] : [],
      type: 'website',
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: 'https://joy.so',
      types: {
        'application/rss+xml': 'https://joy.so/rss.xml',
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background dark:bg-background-dark transition-colors",
        inter.className,
        poppins.variable,
        baiJamjuree.variable,
        "font-sans"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
