import { createLazyFileRoute } from '@tanstack/react-router'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.CART)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/cart"!</div>
}
