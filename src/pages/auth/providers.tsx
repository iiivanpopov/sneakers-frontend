import type { StageProviderProps } from './contexts/stage'
import { StageProvider } from './contexts/stage'

interface ProvidersProps {
  children: React.ReactNode
  stage: Omit<StageProviderProps, 'children'>
}

export function Providers({ children, stage }: ProvidersProps) {
  return <StageProvider {...stage}>{children}</StageProvider>
}
