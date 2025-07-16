import { useEffect, useState } from 'react'
import { Route } from '@/app/routes/sneaker.$slug'
import { useAddToCartMutation } from '@/shared/api/hooks/useAddToCartMutation'
import { useAddToFavoritesMutation } from '@/shared/api/hooks/useAddToFavoritesMutation'
import { useGetCartQuery } from '@/shared/api/hooks/useGetCartQuery'
import { useGetFavoritesQuery } from '@/shared/api/hooks/useGetFavoritesQuery'
import { useGetSneakerStockQuery } from '@/shared/api/hooks/useGetSneakerStockQuery'
import { useRemoveFromFavoritesMutation } from '@/shared/api/hooks/useRemoveFromFavoritesMutation'
import { useCart } from '@/shared/contexts/cart'
import { useFavorites } from '@/shared/contexts/favorites'

export function useSneakerPage() {
  const sneaker = Route.useLoaderData()
  const [isFavored, setIsFavored] = useState(sneaker?.isFavored ?? false)
  const cartCtx = useCart()
  const favoritesCtx = useFavorites()
  const { refetch: refetchCart } = useGetCartQuery()
  const { refetch: refetchFavorites } = useGetFavoritesQuery()

  const slug = sneaker?.slug
  const { data: stockData, isLoading: isStockLoading } =
    useGetSneakerStockQuery(slug ? { slug } : { slug: '' })
  const stockList: StockItem[] = Array.isArray(stockData?.data.data)
    ? stockData.data.data
    : []
  const [selectedStockId, setSelectedStockId] = useState<string | null>(
    stockList.length > 0 ? stockList[0].id : null
  )

  useEffect(() => {
    if (stockList.length > 0) {
      setSelectedStockId(stockList[0].id)
    }
  }, [stockList.length, slug])

  const addToFavorite = useAddToFavoritesMutation({
    options: {
      onSuccess: async () => {
        setIsFavored(true)
        const { data } = await refetchFavorites()
        if (data?.data?.data) favoritesCtx.setFavorites(data.data.data)
      },
      onError: () => setIsFavored(false)
    }
  })
  const removeFromFavorite = useRemoveFromFavoritesMutation({
    options: {
      onSuccess: async () => {
        setIsFavored(false)
        const { data } = await refetchFavorites()
        if (data?.data?.data) favoritesCtx.setFavorites(data.data.data)
      },
      onError: () => setIsFavored(true)
    }
  })
  const addToCart = useAddToCartMutation({
    options: {
      onSuccess: async () => {
        const { data } = await refetchCart()
        if (data?.data?.data) cartCtx.setCart(data.data.data)
      }
    }
  })

  const handleFavoriteToggle = () => {
    if (!sneaker) return
    if (isFavored) {
      setIsFavored(false)
      removeFromFavorite.mutate({ params: { slug: sneaker.slug } })
    } else {
      setIsFavored(true)
      addToFavorite.mutate({ params: { slug: sneaker.slug } })
    }
  }

  const handleAddToCart = () => {
    if (!sneaker || !selectedStockId) return
    addToCart.mutate({ params: { stockId: selectedStockId, quantity: 1 } })
  }

  return {
    sneaker,
    isFavored,
    setIsFavored,
    stockList,
    selectedStockId,
    setSelectedStockId,
    isStockLoading,
    addToCart,
    addToFavorite,
    removeFromFavorite,
    handleFavoriteToggle,
    handleAddToCart
  }
}
