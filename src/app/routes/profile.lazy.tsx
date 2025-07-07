import { createLazyFileRoute } from '@tanstack/react-router'
import { ProfileLoading } from '@/pages/profile/loading'
import { ProfilePage } from '@/pages/profile/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.AUTH)({
  component: ProfilePage,
  pendingComponent: ProfileLoading
})
