import { useRouter, useSearch } from '@tanstack/react-router'
import { ROUTES } from '@/shared/constants/routes'

export function useFilters() {
  const router = useRouter()
  const search = useSearch({ from: ROUTES.CATALOG })

  const navigateBrand = (brand: string) => {
    router.navigate({
      to: '.',
      search: prev => ({ ...prev, brand })
    })
  }

  const navigateDiscount = (discount: boolean) => {
    router.navigate({
      to: '.',
      search: prev => ({ ...prev, discount: discount ? 'true' : '' })
    })
  }

  return {
    state: {
      brand: search.brand || '',
      discount: search.discount === 'true'
    },
    functions: {
      setBrand: navigateBrand,
      setDiscount: navigateDiscount
    }
  }
}
