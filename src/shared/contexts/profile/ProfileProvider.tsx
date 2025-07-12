import { useMemo, useState } from 'react'
import { ProfileContext } from './ProfileContext'

export interface ProfileProviderProps {
  children: React.ReactNode
  defaultProfile?: User
}

export function ProfileProvider ({
  children,
  defaultProfile
}: ProfileProviderProps) {
  const [profile, setProfile] = useState<User>(defaultProfile!)

  const value = useMemo(() => ({ profile, setProfile }), [profile])

  return <ProfileContext value={value}>{children}</ProfileContext>
}
