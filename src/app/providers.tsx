import type {I18nProviderProps} from '@/shared/contexts/i18n';
import type {ProfileProviderProps} from '@/shared/contexts/profile';
import type { QueryProviderProps } from '@/shared/contexts/query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { Toaster } from 'sonner'
import { I18nProvider  } from '@/shared/contexts/i18n'
import {
  ProfileProvider
  
} from '@/shared/contexts/profile'
import { QueryProvider } from '@/shared/contexts/query'
import { SidebarProvider } from '@/shared/contexts/sidebar/SidebarProvider'

export interface ProvidersProps {
  children: React.ReactNode
  locale: Omit<I18nProviderProps, 'children'>
  profile: Omit<ProfileProviderProps, 'children'>
  query: Omit<QueryProviderProps, 'children'>
}

export function Providers({
  children,
  profile,
  query,
  locale
}: ProvidersProps) {
  return (
    <I18nProvider {...locale}>
      <ProfileProvider {...profile}>
        <SidebarProvider>
          <QueryProvider {...query}>
            <LazyMotion features={domAnimation}>
              <Toaster />
              {children}
            </LazyMotion>
          </QueryProvider>
        </SidebarProvider>
      </ProfileProvider>
    </I18nProvider>
  )
}
