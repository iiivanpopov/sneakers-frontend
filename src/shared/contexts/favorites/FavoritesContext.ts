import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

export interface FavoritesContextProps {
  favorites: SneakerItem[]
  setFavorites: Dispatch<SetStateAction<SneakerItem[]>>
  isOpened: boolean
  setIsOpened: Dispatch<SetStateAction<boolean>>
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  setFavorites: () => {},
  isOpened: false,
  setIsOpened: () => {}
})
