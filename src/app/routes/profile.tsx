import { createFileRoute, redirect } from '@tanstack/react-router'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.PROFILE)({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: ROUTES.AUTH })
    }
  }
})
