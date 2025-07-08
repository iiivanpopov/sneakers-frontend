import { createFileRoute } from '@tanstack/react-router'
import { IndexPage } from '@/pages/index/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.INDEX)({
  component: IndexPage
})
