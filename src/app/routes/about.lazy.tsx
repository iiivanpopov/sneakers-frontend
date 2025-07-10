import { createLazyFileRoute } from '@tanstack/react-router'
import { AboutLoading } from '@/pages/about/loading'
import { AboutPage } from '@/pages/about/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.ABOUT)({
  component: AboutPage,
  pendingComponent: AboutLoading
})
