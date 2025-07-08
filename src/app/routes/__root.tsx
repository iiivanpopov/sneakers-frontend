import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  )
})
