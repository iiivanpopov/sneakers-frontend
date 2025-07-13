import type { Locale } from './I18nContext'
import { useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'

import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { I18Context } from './I18nContext'

export interface I18nProviderProps {
  children: React.ReactNode
  defaultLocale: Locale
}

async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return import('@/locales/en.json').then(m => m.default)
    case 'uk':
      return import('@/locales/uk.json').then(m => m.default)
    default:
      return import('@/locales/en.json').then(m => m.default)
  }
}

export function I18nProvider({ children, defaultLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [messages, setMessages] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    loadMessages(locale).then(setMessages)
  }, [locale])

  const setLocaleLocalStorage = (nextLocale: Locale) => {
    setLocale(nextLocale)
    localStorage.setItem(LOCAL_STORAGE.LANGUAGE, nextLocale)
  }

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale: setLocaleLocalStorage
    }),
    [locale]
  )

  if (!messages) return null

  return (
    <I18Context value={contextValue}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </I18Context>
  )
}
