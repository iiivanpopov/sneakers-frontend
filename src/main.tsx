import type { ProvidersProps } from './app/providers'
import type { Locale } from './shared/contexts/i18n'
import { QueryClient } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { Providers } from './app/providers'

import { Router } from './app/router'
import { getProfile } from './shared/api'
import { getCart } from './shared/api/requests/cart'
import { getFavorites } from './shared/api/requests/favorites'
import { LOCAL_STORAGE } from './shared/constants/localStorage'
import './assets/css/reset.css'
import './assets/css/theme.css'
import './assets/css/global.css'

export async function init() {
  const rootElement = document.getElementById('root')!
  const root = createRoot(rootElement)

  const locale = localStorage.getItem(LOCAL_STORAGE.LANGUAGE) as Locale | null
  const queryClient = new QueryClient()

  const providersProps: Omit<ProvidersProps, 'children'> = {
    query: { client: queryClient },
    locale: {
      defaultLocale: locale ?? 'en'
    },
    profile: {
      defaultProfile: undefined!
    },
    favorites: {
      defaultFavorites: []
    },
    cart: {
      defaultCart: []
    }
  }

  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

  if (token) {
    try {
      const getProfileQuery = await queryClient.fetchQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
      })

      const getFavoritesQuery = await queryClient.fetchQuery({
        queryKey: ['profile'],
        queryFn: () => getFavorites()
      })

      const getCartQuery = await queryClient.fetchQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
      })

      providersProps.favorites.defaultFavorites = getFavoritesQuery.data?.data
      providersProps.profile.defaultProfile = getProfileQuery.data?.user
      providersProps.cart.defaultCart = getCartQuery.data?.data
    } catch (error) {
      console.error(error)
    }
  }

  root.render(
    <Providers {...providersProps}>
      <Router />
    </Providers>
  )
}

init()
