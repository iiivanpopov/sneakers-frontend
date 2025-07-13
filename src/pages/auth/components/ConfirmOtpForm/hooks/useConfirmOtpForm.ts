import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as z from 'zod'
import { useEmail } from '@/pages/auth/contexts/email'
import { useGetOtpMutation, useSignInMutation } from '@/shared/api'
import { useGetOtpStatusQuery } from '@/shared/api/hooks/useGetOtpStatusMutation'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { ROUTES } from '@/shared/constants/routes'
import { useProfile } from '@/shared/contexts/profile'
import { isApiError } from '@/shared/lib'
import { toast } from '@/shared/ui'

export const confirmOtpSchema = z.object({
  email: z.string().email('validation.invalidEmail'),
  code: z
    .string()
    .length(6, 'validation.otpLength')
    .regex(/^\d+$/, 'validation.numeric')
})

export type ConfirmOtpSchema = z.infer<typeof confirmOtpSchema>

export function useConfirmOtpForm() {
  const { formatMessage } = useIntl()
  const { email, setEmail } = useEmail()
  const { setProfile } = useProfile()
  const navigate = useNavigate()
  const [retryIn, setRetryIn] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const signInMutation = useSignInMutation()
  const getOtpMutation = useGetOtpMutation()

  const form = useForm<ConfirmOtpSchema>({
    defaultValues: { email, code: '' },
    resolver: zodResolver(confirmOtpSchema),
    mode: 'onChange'
  })

  const { data: otpStatusData } = useGetOtpStatusQuery(
    { email },
    {
      options: {
        enabled: !!email,
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  )

  const startTimer = useCallback((targetTime: number) => {
    if (timerRef.current) clearInterval(timerRef.current)

    const tick = () => {
      const remaining = Math.floor((targetTime - Date.now()) / 1000)
      if (remaining <= 0) {
        setRetryIn(null)
        clearInterval(timerRef.current!)
        timerRef.current = null
      } else {
        setRetryIn(remaining)
      }
    }

    tick()
    timerRef.current = setInterval(tick, 1000)
  }, [])

  const onSubmit = useCallback(
    form.handleSubmit(async (data: ConfirmOtpSchema) => {
      try {
        const response = await signInMutation.mutateAsync({
          params: { ...data, code: Number(data.code) }
        })

        localStorage.setItem(
          LOCAL_STORAGE.ACCESS_TOKEN,
          response.data.accessToken
        )

        setEmail('')
        flushSync(() => setProfile(response.data.user))
        navigate({ to: ROUTES.PROFILE })
        toast.success(formatMessage({ id: 'notification.signedIn' }))
      } catch (error) {
        if (
          isApiError(error) &&
          error.response?.data.reason === 'Incorrect otp code'
        ) {
          toast.error(formatMessage({ id: 'notification.incorrectOtp' }))
        } else {
          toast.error(formatMessage({ id: 'notification.error.generic' }))
        }
      }
    }),
    [email]
  )

  const onResendCode = useCallback(async () => {
    if (retryIn && retryIn > 0) return

    try {
      const response = await getOtpMutation.mutateAsync({
        params: { email }
      })

      if (response.data?.retryAt > Date.now()) {
        startTimer(response.data.retryAt)
      }

      toast.success(formatMessage({ id: 'notification.otpResent' }))
    } catch (error) {
      if (isApiError(error)) {
        toast.error(formatMessage({ id: 'notification.error.resendOtp' }))
      }
    }
  }, [email, retryIn])

  useEffect(() => {
    if (
      otpStatusData?.data?.retryAt &&
      otpStatusData.data.retryAt > Date.now()
    ) {
      startTimer(otpStatusData.data.retryAt)
    }
  }, [otpStatusData, startTimer])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return {
    form,
    state: {
      retryIn,
      isLoading: signInMutation.isPending || getOtpMutation.isPending
    },
    functions: {
      onSubmit,
      onResendCode
    }
  }
}
