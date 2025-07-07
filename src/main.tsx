import type { ProvidersProps } from './app/providers'
import { QueryClient } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { App } from './app/app'
import { Providers } from './app/providers'
import './assets/css/reset.css'
import './assets/css/theme.css'
import './assets/css/global.css'
import './assets/css/fonts.css'

export function init() {
  const rootElement = document.getElementById('root')!
  const root = createRoot(rootElement)

  const queryClient = new QueryClient()
  const providersProps: Omit<ProvidersProps, 'children'> = {
    query: { client: queryClient },
  }

  root.render(
    <Providers {...providersProps}><App /></Providers>,
  )
}

init()
