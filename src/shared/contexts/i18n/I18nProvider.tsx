import type { Locale } from './I18nContext'
import { useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import enMessages from '@/locales/en.json'
import ukMessages from '@/locales/uk.json'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { I18Context } from './I18nContext'

const messages = {
  en: enMessages,
  uk: ukMessages
}

export interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const storedLocale = localStorage.getItem(
    LOCAL_STORAGE.LANGUAGE
  ) as Locale | null
  const initialLocale: Locale = storedLocale ?? 'en'
  const [locale, setLocale] = useState<Locale>(initialLocale)

  const setLocaleLocalStorage = (locale: Locale) => {
    setLocale(locale)
    localStorage.setItem(LOCAL_STORAGE.LANGUAGE, locale)
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleLocalStorage
    }),
    [locale]
  )

  return (
    <I18Context value={value}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </I18Context>
  )
}
