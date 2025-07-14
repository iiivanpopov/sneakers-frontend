import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '@/pages/about/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.ABOUT)({
  component: AboutPage
})
