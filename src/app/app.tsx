import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

const router = createRouter({
  routeTree,
  scrollRestorationBehavior: 'instant',
  scrollRestoration: true
})

export function App() {
  return <RouterProvider router={router} />
}
