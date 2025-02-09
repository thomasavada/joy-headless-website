"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Set theme based on path
    if (pathname.startsWith('/blog') || pathname.startsWith('/integrations')) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [pathname]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={pathname.startsWith('/blog') ? 'light' : 'dark'}
      enableSystem={false}
      forcedTheme={pathname.startsWith('/blog') ? 'light' : 'dark'} // Force theme based on path
    >
      {children}
    </NextThemesProvider>
  );
}
