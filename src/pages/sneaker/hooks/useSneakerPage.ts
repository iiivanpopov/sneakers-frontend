import { useEffect, useState } from 'react'
import { Route } from '@/app/routes/sneaker.$slug'
import { useAddToCartMutation } from '@/shared/api/hooks/useAddToCartMutation'
import { useAddToFavoritesMutation } from '@/shared/api/hooks/useAddToFavoritesMutation'
import { useGetCartQuery } from '@/shared/api/hooks/useGetCartQuery'
import { useGetSneakerStockQuery } from '@/shared/api/hooks/useGetSneakerStockQuery'
import { useRemoveFromFavoritesMutation } from '@/shared/api/hooks/useRemoveFromFavoritesMutation'

export function useSneakerPage() {
  const sneaker = Route.useLoaderData()
  const [isFavored, setIsFavored] = useState(sneaker?.isFavored ?? false)
  const { refetch: refetchCart } = useGetCartQuery()

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
      onSuccess: () => setIsFavored(true),
      onError: () => setIsFavored(false)
    }
  })
  const removeFromFavorite = useRemoveFromFavoritesMutation({
    options: {
      onSuccess: () => setIsFavored(false),
      onError: () => setIsFavored(true)
    }
  })
  const addToCart = useAddToCartMutation({
    options: {
      onSuccess: () => refetchCart()
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
