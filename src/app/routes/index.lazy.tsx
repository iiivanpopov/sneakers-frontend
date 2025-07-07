import { createLazyFileRoute } from '@tanstack/react-router'
import { IndexLoading } from '@/pages/index/loading'
import { IndexPage } from '@/pages/index/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.INDEX)({
  component: IndexPage,
  pendingComponent: IndexLoading,
})
