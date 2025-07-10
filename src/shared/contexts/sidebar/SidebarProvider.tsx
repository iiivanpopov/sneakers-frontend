import { useMemo, useState } from 'react'
import { SidebarContext } from './SidebarContext'

export interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen])

  return <SidebarContext value={value}>{children}</SidebarContext>
}
