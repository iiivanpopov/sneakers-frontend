import { createContext } from 'react'

export type Locale = 'en' | 'uk'

export interface I18nContextProps {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const I18Context = createContext<I18nContextProps>({
  locale: 'en',
  setLocale: () => {}
})
