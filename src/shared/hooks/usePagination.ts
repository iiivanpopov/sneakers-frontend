import type { ROUTES } from '@/shared/constants/routes'
import { useRouter, useSearch } from '@tanstack/react-router'

const MAX_PAGES = 2

export function usePagination(route: (typeof ROUTES)[keyof typeof ROUTES]) {
  const search = useSearch({
    from: route
  })

  const router = useRouter()

  if (!('page' in search)) {
    return {
      currentPage: 1,
      nextPages: [],
      prevPages: [],
      next: () => {},
      prev: () => {},
      setPage: () => {}
    }
  }

  const currentPage = search.page > 0 ? search.page : 1

  const nextPages = Array.from({ length: MAX_PAGES })
    .fill(0)
    .map((_, i) => currentPage + 1 + i)

  const prevPages = Array.from({
    length: Math.min(Math.max(0, currentPage - 1), MAX_PAGES)
  })
    .fill(0)
    .map((_, i) => currentPage - 1 - i)
    .sort((a, b) => a - b)

  const next = () =>
    router.navigate({
      to: '.',

      search: prev => ({ ...prev, page: currentPage + 1 })
    })

  const prev = () =>
    router.navigate({
      to: '.',

      search: prev => ({ ...prev, page: Math.max(1, currentPage - 1) })
    })

  const setPage = (page: number) =>
    router.navigate({
      to: '.',
      search: prev => ({ ...prev, page })
    })

  return { setPage, currentPage, nextPages, prevPages, next, prev }
}
