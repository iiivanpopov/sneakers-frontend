import { createContext } from 'react'

export type Stage = 'confirmOtp' | 'signIn' | 'signUp'

export interface StageContextProps {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const StageContext = createContext<StageContextProps>({
  stage: 'signIn',
  setStage: () => {}
})
