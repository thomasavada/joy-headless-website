import { useTheme } from 'next-themes';
import { useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useSetTheme = (theme: Theme) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return theme;
};