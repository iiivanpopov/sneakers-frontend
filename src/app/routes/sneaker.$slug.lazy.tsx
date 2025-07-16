import { createLazyFileRoute } from '@tanstack/react-router'
import { SneakerLoading } from '@/pages/sneaker/loading'
import { SneakerPage } from '@/pages/sneaker/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.SNEAKER)({
  component: SneakerPage,
  pendingComponent: SneakerLoading
})
