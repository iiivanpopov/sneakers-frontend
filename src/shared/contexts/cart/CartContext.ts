import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

export interface CartContextProps {
  cart: SneakerItem[]
  setCart: Dispatch<SetStateAction<SneakerItem[]>>
  isOpened: boolean
  setIsOpened: Dispatch<SetStateAction<boolean>>
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  isOpened: false,
  setIsOpened: () => {}
})
