import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import { useProfile } from '@/shared/contexts/profile'

const router = createRouter({
  routeTree,
  scrollRestorationBehavior: 'instant',
  scrollRestoration: true,
  context: {
    isAuthenticated: false
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function Router() {
  const { profile } = useProfile()

  return (
    <RouterProvider
      context={{ isAuthenticated: !!profile?.email }}
      router={router}
    />
  )
}
