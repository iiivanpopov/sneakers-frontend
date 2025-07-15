import { useLoaderData } from '@tanstack/react-router'
import { useAddToFavoritesMutation } from '@/shared/api/hooks/useAddToFavoritesMutation'
import { useRemoveFromFavoritesMutation } from '@/shared/api/hooks/useRemoveFromFavoritesMutation'
import { ROUTES } from '@/shared/constants/routes'
import { usePagination } from '@/shared/hooks/usePagination'

export function useCatalogPage() {
  const { sneakers, brands } = useLoaderData({
    from: ROUTES.CATALOG
  })
  const { currentPage, nextPages, prevPages, next, prev, setPage } =
    usePagination(ROUTES.CATALOG)
  const addToFavorite = useAddToFavoritesMutation({
    options: {
      onSuccess: ({ data }) => {
        sneakers.forEach(sneaker => {
          if (data.id === sneaker.id) sneaker.isFavored = true
        })
      }
    }
  })
  const removeFromFavorite = useRemoveFromFavoritesMutation({
    options: {
      onSuccess: ({ data }) => {
        sneakers.forEach(sneaker => {
          if (data.id === sneaker.id) sneaker.isFavored = false
        })
      }
    }
  })

  const toggleFavorite = (sneaker: SneakerItem) => {
    if (sneaker.isFavored) {
      removeFromFavorite.mutate({
        params: {
          slug: sneaker.slug
        }
      })
    } else {
      addToFavorite.mutate({
        params: {
          slug: sneaker.slug
        }
      })
    }
  }

  return {
    sneakers,
    brands,
    pagination: {
      currentPage,
      nextPages,
      prevPages,
      next,
      prev,
      setPage
    },
    toggleFavorite
  }
}
