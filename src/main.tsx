import type { ProvidersProps } from './app/providers'
import type { Locale } from './shared/contexts/i18n'
import { QueryClient } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { App } from './app/app'

import { Providers } from './app/providers'
import { getProfile } from './shared/api'
import { LOCAL_STORAGE } from './shared/constants/localStorage'
import './assets/css/reset.css'
import './assets/css/theme.css'
import './assets/css/global.css'

export async function init() {
  const rootElement = document.getElementById('root')!
  const root = createRoot(rootElement)

  const queryClient = new QueryClient()

  const locale = localStorage.getItem(LOCAL_STORAGE.LANGUAGE) as Locale | null

  const providersProps: Omit<ProvidersProps, 'children'> = {
    query: { client: queryClient },
    locale: {
      defaultLocale: locale ?? 'en'
    },
    profile: {
      defaultProfile: undefined
    }
  }

  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

  if (token) {
    const getProfileQuery = await queryClient.fetchQuery({
      queryKey: ['profile'],
      queryFn: () => getProfile()
    })

    providersProps.profile.defaultProfile = getProfileQuery.data
  }

  root.render(
    <Providers {...providersProps}>
      <App />
    </Providers>
  )
}

init()
