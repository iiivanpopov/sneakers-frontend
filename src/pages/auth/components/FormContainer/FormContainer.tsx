import type { Stage } from '../../contexts/stage'
import { EmailProvider } from '../../contexts/email'
import { useStage } from '../../contexts/stage'
import { ConfirmOtpForm } from '../ConfirmOtpForm'
import { SignInForm } from '../SignInForm'

const component: Record<Stage, React.ReactNode> = {
  confirmOtp: <ConfirmOtpForm />,
  signIn: <SignInForm />
}

export function FormContainer() {
  const { stage } = useStage()

  return <EmailProvider>{component[stage]}</EmailProvider>
}
