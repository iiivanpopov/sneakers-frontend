import { useMemo, useState } from 'react'
import { CartContext } from './CartContext'

export interface CartProviderProps {
  children: React.ReactNode
  defaultCart: SneakerItem[]
}

export function CartProvider({ children, defaultCart }: CartProviderProps) {
  const [cart, setCart] = useState<SneakerItem[]>(defaultCart ?? [])

  const [isOpened, setIsOpened] = useState<boolean>(false)

  const value = useMemo(
    () => ({ isOpened, setIsOpened, cart, setCart }),
    [cart, isOpened]
  )

  return <CartContext value={value}>{children}</CartContext>
}
