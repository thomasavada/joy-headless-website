'use client'

import {ThemeProvider} from 'next-themes'
import {type ReactNode} from 'react'

interface ForcedThemeWrapperProps {
  theme: string
  children: ReactNode
}

export function ForcedThemeWrapper({ theme, children }: ForcedThemeWrapperProps) {
  return (
    <ThemeProvider forcedTheme={theme} attribute="class">
      {children}
    </ThemeProvider>
  )
}
