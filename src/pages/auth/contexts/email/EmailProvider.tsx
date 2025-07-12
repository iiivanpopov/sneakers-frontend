import { useMemo, useState } from 'react'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { EmailContext } from './EmailContext'

export interface EmailProviderProps {
  children: React.ReactNode
}

export function EmailProvider({ children }: EmailProviderProps) {
  const [email, setEmail] = useState<string>(
    sessionStorage.getItem(LOCAL_STORAGE.LAST_AUTH_EMAIL) ?? ''
  )

  const setEmailSessionStorage = (email: string) => {
    setEmail(email)
    sessionStorage.setItem(LOCAL_STORAGE.LAST_AUTH_EMAIL, email)
  }

  const value = useMemo(
    () => ({ email, setEmail: setEmailSessionStorage }),
    [email]
  )

  return <EmailContext value={value}>{children}</EmailContext>
}
