import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as z from 'zod'
import { useUpdateProfileMutation } from '@/shared/api/hooks/useUpdateProfileMutation'
import { useProfile } from '@/shared/contexts/profile'
import { toast } from '@/shared/ui/common/Toast'

function useEditProfileSchema() {
  const { formatMessage } = useIntl()
  // TODO: Return code instead of formatted message

  return z.object({
    email: z.string().email(formatMessage({ id: 'validation.invalidEmail' })),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    country: z.string(),
    city: z.string()
  })
}

export type EditProfileSchema = z.infer<ReturnType<typeof useEditProfileSchema>>

export function useProfilePage() {
  const { formatMessage } = useIntl()
  const editProfileSchema = useEditProfileSchema()
  const { profile, setProfile } = useProfile()

  const editProfileForm = useForm<EditProfileSchema>({
    defaultValues: {
      email: profile?.email ?? '',
      firstName: profile?.firstName ?? '',
      middleName: profile?.middleName ?? '',
      lastName: profile?.lastName ?? '',
      city: profile?.city ?? '',
      country: profile?.country ?? ''
    },
    resolver: zodResolver(editProfileSchema)
  })

  const updateProfileMutation = useUpdateProfileMutation()

  const onSubmit = editProfileForm.handleSubmit(async data => {
    const response = await updateProfileMutation.mutateAsync({
      params: { email: profile.email, profile: data }
    })

    if (response.data.success) {
      const user = response.data.user
      setProfile(user)
      toast.success(formatMessage({ id: 'notification.success.updateUser' }))
    } else {
      toast.error(formatMessage({ id: 'notification.error.updateUser' }))
    }
  })

  return {
    form: editProfileForm,
    state: { profile },
    functions: {
      onSubmit
    }
  }
}
