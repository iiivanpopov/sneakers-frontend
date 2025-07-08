import type { Stage } from './StageContext'

import React, { useMemo, useState } from 'react'

import { StageContext } from './StageContext'

export interface StageProviderProps {
  children: React.ReactNode
  defaultStage?: Stage
}

export function StageProvider({
  children,
  defaultStage = 'signIn'
}: StageProviderProps) {
  const [stage, setStage] = useState<Stage>(defaultStage)

  const value = useMemo(() => ({ stage, setStage }), [stage])

  return <StageContext value={value}>{children}</StageContext>
}
