import { createLazyFileRoute } from '@tanstack/react-router'
import { OrderLoading } from '@/pages/order/loading'
import { OrderPage } from '@/pages/order/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.ORDER)({
  component: OrderPage,
  pendingComponent: OrderLoading
})
