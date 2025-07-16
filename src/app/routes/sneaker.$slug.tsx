import { createFileRoute } from '@tanstack/react-router'
import { getSneaker } from '@/shared/api'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createFileRoute(ROUTES.SNEAKER)({
  loader: ({ params }) =>
    getSneaker({
      params: {
        slug: params.slug
      }
    })
      .catch(e => {
        console.error(e)
      })
      .then(response => response?.data?.data)
})
