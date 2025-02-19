'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeSetter } from './ThemeSetter';

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log('ThemeWrapper mounted');
  }, []);

  if (!isMounted) {
    console.log('ThemeWrapper not mounted yet');
    return null; // or a loading state
  }

  console.log('ThemeWrapper rendering with theme setter');
  return (
    <>
      <ThemeSetter theme="light" />
      {children}
    </>
  );
};