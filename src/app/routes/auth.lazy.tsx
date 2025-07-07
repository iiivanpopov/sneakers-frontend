import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthLoading } from '@/pages/auth/loading'
import { AuthPage } from '@/pages/auth/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.AUTH)({
  component: AuthPage,
  pendingComponent: AuthLoading
})
