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
            limit: '9',
            offset:
              'page' in location.search
                ? String(Math.max(0, Number(location.search.page) - 1) * 9)
                : '0',
            brandName:
              'brand' in location.search
                ? String(location.search.brand).toString()
                : undefined,
            hasDiscount:
              'discount' in location.search
                ? location.search.discount
                  ? true
                  : undefined
                : undefined
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
    page: z.coerce.number().int().min(1).default(1),
    brand: z.coerce.string().default(''),
    discount: z.coerce.string().default('')
  })
})
