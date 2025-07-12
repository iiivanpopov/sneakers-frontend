import { useMemo, useState } from 'react'
import { EmailContext } from './EmailContext'

export interface EmailProviderProps {
  children: React.ReactNode
}

export function EmailProvider({ children }: EmailProviderProps) {
  const [email, setEmail] = useState<string>('')

  const value = useMemo(() => ({ email, setEmail }), [email])

  return <EmailContext value={value}>{children}</EmailContext>
}
