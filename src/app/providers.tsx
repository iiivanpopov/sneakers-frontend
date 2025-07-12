import type { QueryProviderProps } from '@/shared/contexts/query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { Toaster } from 'sonner'
import { I18nProvider } from '@/shared/contexts/i18n'
import { QueryProvider } from '@/shared/contexts/query'
import { SidebarProvider } from '@/shared/contexts/sidebar/SidebarProvider'

export interface ProvidersProps {
  children: React.ReactNode
  query: Omit<QueryProviderProps, 'children'>
}

export function Providers({ children, query }: ProvidersProps) {
  return (
    <I18nProvider>
      <SidebarProvider>
        <QueryProvider {...query}>
          <LazyMotion features={domAnimation}>
            <Toaster />
            {children}
          </LazyMotion>
        </QueryProvider>
      </SidebarProvider>
    </I18nProvider>
  )
}
