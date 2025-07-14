import { createFileRoute } from '@tanstack/react-router'
import { getSneakerBrands, getSneakers } from '@/shared/api'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.CATALOG)({
  loader: async () => {
    try {
      const [sneakers, brands] = await Promise.all([
        getSneakers({
          params: {
            limit: '10'
          }
        }),
        getSneakerBrands({})
      ])

      return {
        sneakers: sneakers.data?.data,
        brands: brands.data?.data
      }
    } catch (error) {
      console.error(error)
      return { sneakers: [], brands: [] }
    }
  }
})
