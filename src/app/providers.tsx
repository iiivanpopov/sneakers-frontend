import type { QueryProviderProps } from '@/shared/contexts/query'
import { QueryProvider } from '@/shared/contexts/query'

export interface ProvidersProps {
  children: React.ReactNode
  query: Omit<QueryProviderProps, 'children'>
}

export function Providers({ children, query }: ProvidersProps) {
  return <QueryProvider {...query}>{children}</QueryProvider>
}
