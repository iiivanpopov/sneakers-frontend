import { createFileRoute } from '@tanstack/react-router'
import { IndexPage } from '@/pages/index/page'
import { getPopularSneakers } from '@/shared/api'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.INDEX)({
  component: IndexPage,
  loader: async () => {
    try {
      const response = await getPopularSneakers({ params: { limit: '3' } })
      return {
        popularSneakers: response.data?.data
      }
    } catch (error) {
      console.error(error)
      return { popularSneakers: [] }
    }
  }
})
