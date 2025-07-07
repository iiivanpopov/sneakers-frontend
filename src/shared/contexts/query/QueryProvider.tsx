import { QueryClientProvider } from '@tanstack/react-query'

export interface QueryProviderProps
  extends React.ComponentProps<typeof QueryClientProvider> {
  children: React.ReactNode
}

export function QueryProvider({ children, client }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
