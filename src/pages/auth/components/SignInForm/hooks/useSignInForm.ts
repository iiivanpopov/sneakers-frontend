import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as z from 'zod'
import { useEmail } from '@/pages/auth/contexts/email'
import { useStage } from '@/pages/auth/contexts/stage'
import { useGetOtpMutation } from '@/shared/api'

function useSingInSchema() {
  const { formatMessage } = useIntl()

  return z.object({
    email: z.string().email(formatMessage({ id: 'validation.invalidEmail' }))
  })
}

export type SignInData = z.infer<ReturnType<typeof useSingInSchema>>

export function useSignInForm() {
  const signInSchema = useSingInSchema()

  const { setStage } = useStage()
  const { setEmail } = useEmail()
  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema)
  })

  const getOtpMutation = useGetOtpMutation({
    options: {
      onSuccess: () => {
        setStage('confirmOtp')
      }
    }
  })
  // TODO: Rewrite to mutateAsync

  const onSubmit = signInForm.handleSubmit(data => {
    setEmail(data.email)
    getOtpMutation.mutate({ params: data })
  })

  return {
    form: signInForm,
    functions: {
      onSubmit
    }
  }
}
