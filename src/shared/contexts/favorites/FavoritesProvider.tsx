import { useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'

export interface FavoritesProviderProps {
  children: React.ReactNode
  defaultFavorites: SneakerItem[]
}

export function FavoritesProvider({
  children,
  defaultFavorites
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<SneakerItem[]>(
    defaultFavorites ?? []
  )

  const [isOpened, setIsOpened] = useState<boolean>(false)

  const value = useMemo(
    () => ({ isOpened, setIsOpened, favorites, setFavorites }),
    [favorites, isOpened]
  )

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
