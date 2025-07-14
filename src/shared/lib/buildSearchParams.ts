export function buildSearchParams(
  params: Record<string, string | boolean | undefined | null>
): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') {
      searchParams.append(key, String(value))
    }
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}
