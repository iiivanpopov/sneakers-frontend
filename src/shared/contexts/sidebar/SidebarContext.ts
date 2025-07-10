import { createContext } from 'react'

export interface SidebarContextProps {
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}

export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {}
})
