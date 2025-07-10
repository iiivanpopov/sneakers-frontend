import { useQuery } from '@tanstack/react-query'
import { getSneakerBrands } from '../requests'

export function useGetSneakerBrandsQuery(
  settings?: QuerySettings<typeof getSneakerBrands>
) {
  return useQuery({
    queryKey: ['getSneakerBrandsQuery'],
    queryFn: () => getSneakerBrands({ config: settings?.config }),
    ...settings?.options
  })
}
