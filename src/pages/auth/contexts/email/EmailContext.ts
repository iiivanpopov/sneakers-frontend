import { createContext } from 'react'

export interface EmailContextProps {
  email: string
  setEmail: (email: string) => void
}

export const EmailContext = createContext<EmailContextProps>({
  email: '',
  setEmail: () => {}
})
