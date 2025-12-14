export type TTheme = 'light' | 'dark'

export interface ThemeContextType {
  theme: TTheme
  toggleTheme: () => void
  setTheme: (theme: TTheme) => void
}
