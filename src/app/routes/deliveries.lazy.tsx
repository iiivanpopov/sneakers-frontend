import { createLazyFileRoute } from '@tanstack/react-router'
import { DeliveriesLoading } from '@/pages/deliveries/loading'
import { DeliveriesPage } from '@/pages/deliveries/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.DELIVERIES)({
  component: DeliveriesPage,
  pendingComponent: DeliveriesLoading
})
