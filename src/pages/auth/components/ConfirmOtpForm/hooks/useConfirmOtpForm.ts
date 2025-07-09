import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useEmail } from '@/pages/auth/contexts/email'
import { useGetOtpMutation, useSignInMutation } from '@/shared/api'
import { useGetOtpStatusQuery } from '@/shared/api/hooks/useGetOtpStatusMutation'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { ROUTES } from '@/shared/constants/routes'
import { isApiError } from '@/shared/lib/isApiError'
import { toast } from '@/shared/ui/common/Toast'

const confirmOtpSchema = z.object({
  code: z.string().length(6, 'Confirm code must be 6 characters long'),
  email: z.string().email('Invalid email')
})

export type ConfirmOtpData = z.infer<typeof confirmOtpSchema>

export function useConfirmOtpForm() {
  const { email, setEmail } = useEmail()
  const navigate = useNavigate()
  const [retryIn, setRetryIn] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout>({} as NodeJS.Timeout)

  const form = useForm<ConfirmOtpData>({
    defaultValues: { email },
    resolver: zodResolver(confirmOtpSchema)
  })

  const signInMutation = useSignInMutation({
    options: {
      onSuccess: response => {
        localStorage.setItem(
          LOCAL_STORAGE.ACCESS_TOKEN,
          response.data.accessToken
        )
        setEmail('')
        navigate({ to: ROUTES.PROFILE })
        toast.success('Successfully signed in')
      },
      onError: error => {
        if (isApiError(error)) {
          toast.error(error.response.data.reason)
        }
      }
    }
  })

  const startTimer = (targetTime: number) => {
    clearInterval(timerRef.current)

    const tick = () => {
      const remaining = Math.floor((targetTime - Date.now()) / 1000)
      if (remaining <= 0) {
        setRetryIn(null)
        clearInterval(timerRef.current)
      } else {
        setRetryIn(remaining)
      }
    }

    tick()
    timerRef.current = setInterval(tick, 1000)
  }

  const getOtpMutation = useGetOtpMutation({
    options: {
      onSuccess: data => {
        if (data.data.retryAt > Date.now()) {
          startTimer(data.data.retryAt)
        }
      }
    }
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

  const resendCode = () => {
    if (retryIn && retryIn > 0) return
    getOtpMutation.mutate({ params: { email } })
  }

  const onSubmit = form.handleSubmit(data => {
    signInMutation.mutate({
      params: { ...data, code: Number(data.code) }
    })
  })

  useEffect(() => {
    if (
      otpStatusData?.data.retryAt &&
      otpStatusData?.data.retryAt > Date.now()
    ) {
      startTimer(otpStatusData?.data.retryAt)
    }
  }, [otpStatusData])

  useEffect(() => () => clearInterval(timerRef.current), [])

  return {
    form,
    state: {
      retryIn
    },
    functions: { onSubmit, resendCode }
  }
}
