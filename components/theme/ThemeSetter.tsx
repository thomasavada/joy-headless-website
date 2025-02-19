'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeSetterProps = {
  theme: 'light' | 'dark';
};

export const ThemeSetter = ({ theme }: ThemeSetterProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    console.log('ThemeSetter component mounted');
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log('ThemeSetter attempting to set theme:', theme);
    console.log('Current state:', { currentTheme, resolvedTheme });

    const timeoutId = setTimeout(() => {
      console.log('Setting theme to:', theme);
      setTheme(theme);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isMounted, theme, setTheme, currentTheme, resolvedTheme]);

  if (!isMounted) {
    console.log('ThemeSetter not mounted yet');
    return null;
  }

  console.log('ThemeSetter rendered');
  return null;
};