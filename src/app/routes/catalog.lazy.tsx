import { createLazyFileRoute } from '@tanstack/react-router'
import { CatalogLoading } from '@/pages/catalog/loading'
import { CatalogPage } from '@/pages/catalog/page'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createLazyFileRoute(ROUTES.CATALOG)({
  component: CatalogPage,
  pendingComponent: CatalogLoading,
})
