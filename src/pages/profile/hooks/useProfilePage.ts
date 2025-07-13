import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as z from 'zod'
import { useUpdateProfileMutation } from '@/shared/api/hooks/useUpdateProfileMutation'
import { useProfile } from '@/shared/contexts/profile'
import { toast } from '@/shared/ui'

export const editProfileSchema = z.object({
  email: z.string().email('validation.invalidEmail'),
  firstName: z.string().min(1, 'validation.required'),
  middleName: z.string().min(1, 'validation.required'),
  lastName: z.string().min(1, 'validation.required'),
  country: z.string().min(1, 'validation.required'),
  city: z.string().min(1, 'validation.required')
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>

export function useProfilePage() {
  const { formatMessage } = useIntl()
  const { profile, setProfile } = useProfile()
  const updateProfileMutation = useUpdateProfileMutation()

  const form = useForm<EditProfileSchema>({
    defaultValues: {
      email: profile?.email ?? '',
      firstName: profile?.firstName ?? '',
      middleName: profile?.middleName ?? '',
      lastName: profile?.lastName ?? '',
      city: profile?.city ?? '',
      country: profile?.country ?? ''
    },
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange'
  })

  const onSubmit = useCallback(
    form.handleSubmit(async (data: EditProfileSchema) => {
      try {
        const response = await updateProfileMutation.mutateAsync({
          params: { email: profile?.email ?? '', profile: data }
        })

        if (response.data.success) {
          setProfile(response.data.user)
          toast.success(
            formatMessage({ id: 'notification.success.updateUser' })
          )
          form.reset(data)
        } else {
          throw new Error('Update failed')
        }
      } catch (error) {
        toast.error(formatMessage({ id: 'notification.error.updateUser' }))
        console.error(error)
      }
    }),
    [profile?.email]
  )

  return {
    form,
    state: {
      profile,
      isLoading: updateProfileMutation.isPending
    },
    functions: {
      onSubmit
    }
  }
}
