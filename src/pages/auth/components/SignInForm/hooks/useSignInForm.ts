import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as z from 'zod'
import { useEmail } from '@/pages/auth/contexts/email'
import { useStage } from '@/pages/auth/contexts/stage'
import { useGetOtpMutation } from '@/shared/api'
import { toast } from '@/shared/ui/Toast'

export const signInSchema = z.object({
  email: z.string().email('validation.invalidEmail')
})

export type SignInSchema = z.infer<typeof signInSchema>

export function useSignInForm() {
  const { formatMessage } = useIntl()
  const { setStage } = useStage()
  const { setEmail } = useEmail()
  const getOtpMutation = useGetOtpMutation()

  const form = useForm<SignInSchema>({
    defaultValues: { email: '' },
    resolver: zodResolver(signInSchema),
    mode: 'onChange'
  })

  const onSubmit = useCallback(
    form.handleSubmit(async (data: SignInSchema) => {
      await getOtpMutation.mutateAsync({ params: data })
      setEmail(data.email)
      setStage('confirmOtp')
      toast.success(formatMessage({ id: 'notification.otpSent' }))
    }),
    [form, setEmail, setStage, getOtpMutation, formatMessage]
  )

  return {
    form,
    state: {
      isLoading: getOtpMutation.isPending
    },
    functions: {
      onSubmit
    }
  }
}
