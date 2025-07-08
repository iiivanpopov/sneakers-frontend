import type { Stage } from '../../contexts/stage'
import { useStage } from '../../contexts/stage'
import { ConfirmOtpForm } from '../ConfirmOtpForm'
import { SignInForm } from '../SignInForm'
import { SignUpForm } from '../SignUpForm'

const component: Record<Stage, React.ReactNode> = {
  confirmOtp: <ConfirmOtpForm />,
  signIn: <SignInForm />,
  signUp: <SignUpForm />
}

export function FormContainer() {
  const { stage } = useStage()

  return component[stage]
}
