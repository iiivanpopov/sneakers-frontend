import type { GetOtpStatusRequestParams } from '../requests'
import { useQuery } from '@tanstack/react-query'

import { getOtpStatus } from '../requests'

export function useGetOtpStatusQuery(
  params: GetOtpStatusRequestParams,
  settings?: QuerySettings<typeof getOtpStatus>
) {
  return useQuery({
    queryKey: ['getOtpStatusQuery'],
    queryFn: () => getOtpStatus({ params, config: settings?.config }),
    ...settings?.options
  })
}
