'use client'

import { ThemeContextType, TTheme } from '@/shared/types/theme-types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function applyTheme(theme: TTheme) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<TTheme>('light')
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialization: we read the saved theme once
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as TTheme | null

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark')
      applyTheme('dark')
    } else {
      applyTheme('light')
    }

    setIsInitialized(true)
  }, [])

  // We save and apply the theme only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('theme', theme)
      applyTheme(theme)
    }
  }, [theme, isInitialized])

  const setTheme = useCallback((newTheme: TTheme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
