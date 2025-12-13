'use client'

import { translations } from '@/shared/data/language-data'
import { ILanguageContextType, TLanguage } from '@/shared/types/language-types'
import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext<ILanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<TLanguage>('uk')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as TLanguage | null
    if (savedLang && (savedLang === 'uk' || savedLang === 'en')) {
      setLanguageState(savedLang)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: TLanguage) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'uk' ? 'en' : 'uk'))
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
