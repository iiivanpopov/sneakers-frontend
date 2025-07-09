import { createContext } from 'react'

export type Stage = 'confirmOtp' | 'signIn'

export interface StageContextProps {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const StageContext = createContext<StageContextProps>({
  stage: 'signIn',
  setStage: () => {}
})
