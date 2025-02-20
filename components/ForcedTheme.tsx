'use client'

import {useTheme} from 'next-themes'
import {type ReactNode, useEffect} from 'react'

interface ForcedThemeProps {
  theme: string
  children: ReactNode
}

export function ForcedTheme({ theme, children }: ForcedThemeProps) {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])

  return <>{children}</>
}
