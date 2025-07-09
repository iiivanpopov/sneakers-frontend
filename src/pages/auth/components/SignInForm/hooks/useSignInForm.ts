import { zodResolver } from '@hookform/resolvers/zod'
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useEmail } from '@/pages/auth/contexts/email'
import { useStage } from '@/pages/auth/contexts/stage'
import { useGetOtpMutation } from '@/shared/api'

const signInSchema = z.object({
  email: z.string().email('Invalid email')
})
export type SignInData = z.infer<typeof signInSchema>

export function useSignInForm() {
  const { setStage } = useStage()
  const { setEmail, email } = useEmail()
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

  const onSubmit = signInForm.handleSubmit(data => {
    setEmail(data.email)
    getOtpMutation.mutate({ params: data })
  })

  useLayoutEffect(() => {
    if (email) {
      setStage('confirmOtp')
    }
  }, [])

  return {
    form: signInForm,
    functions: {
      onSubmit
    }
  }
}
