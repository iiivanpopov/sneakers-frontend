import type { CartProviderProps } from '@/shared/contexts/cart'
import type { FavoritesProviderProps } from '@/shared/contexts/favorites'
import type { I18nProviderProps } from '@/shared/contexts/i18n'
import type { ProfileProviderProps } from '@/shared/contexts/profile'
import type { QueryProviderProps } from '@/shared/contexts/query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { lazy } from 'react'
import { CartProvider } from '@/shared/contexts/cart'
import { FavoritesProvider } from '@/shared/contexts/favorites'
import { I18nProvider } from '@/shared/contexts/i18n'
import { ProfileProvider } from '@/shared/contexts/profile'
import { QueryProvider } from '@/shared/contexts/query'
import { SidebarProvider } from '@/shared/contexts/sidebar/SidebarProvider'

const LazyToaster = lazy(() =>
  import('sonner').then(mod => ({ default: mod.Toaster }))
)
export interface ProvidersProps {
  children: React.ReactNode
  locale: Omit<I18nProviderProps, 'children'>
  profile: Omit<ProfileProviderProps, 'children'>
  favorites: Omit<FavoritesProviderProps, 'children'>
  query: Omit<QueryProviderProps, 'children'>
  cart: Omit<CartProviderProps, 'children'>
}

export function Providers({
  children,
  profile,
  query,
  locale,
  favorites,
  cart
}: ProvidersProps) {
  return (
    <I18nProvider {...locale}>
      <ProfileProvider {...profile}>
        <FavoritesProvider {...favorites}>
          <CartProvider {...cart}>
            <SidebarProvider>
              <QueryProvider {...query}>
                <LazyMotion features={domAnimation}>
                  <LazyToaster />
                  {children}
                </LazyMotion>
              </QueryProvider>
            </SidebarProvider>
          </CartProvider>
        </FavoritesProvider>
      </ProfileProvider>
    </I18nProvider>
  )
}
