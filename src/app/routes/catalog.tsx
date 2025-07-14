import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { getSneakerBrands, getSneakers } from '@/shared/api'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.CATALOG)({
  loader: async ({ location }) => {
    try {
      const [sneakers, brands] = await Promise.all([
        getSneakers({
          params: {
            limit: '10',
            offset:
              'page' in location.search
                ? String(Number(location.search.page) * 10)
                : '0'
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
  },
  validateSearch: z.object({
    page: z.coerce.number().int().min(1).default(1)
  })
})
