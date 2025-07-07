import { createLazyFileRoute } from '@tanstack/react-router'
import { OrdersLoading } from '@/pages/orders/loading'
import { OrdersPage } from '@/pages/orders/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.ORDERS)({
  component: OrdersPage,
  pendingComponent: OrdersLoading,
})
