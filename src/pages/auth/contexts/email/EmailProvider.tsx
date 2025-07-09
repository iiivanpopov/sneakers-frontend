import React, { useMemo, useState } from 'react'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { EmailContext } from './EmailContext'

export interface EmailProviderProps {
  children: React.ReactNode
}

export function EmailProvider({ children }: EmailProviderProps) {
  const [email, setEmail] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE.LAST_AUTH_EMAIL) ?? ''
  )

  const setEmailLocalStorage = (email: string) => {
    setEmail(email)
    localStorage.setItem(LOCAL_STORAGE.LAST_AUTH_EMAIL, email)
  }

  const value = useMemo(
    () => ({ email, setEmail: setEmailLocalStorage }),
    [email]
  )

  return <EmailContext value={value}>{children}</EmailContext>
}
