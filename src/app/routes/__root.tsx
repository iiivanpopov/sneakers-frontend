import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header">Header</header>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
})
