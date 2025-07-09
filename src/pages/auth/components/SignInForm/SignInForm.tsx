import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import { useSignInForm } from './hooks/useSignInForm'
import styles from './SignInForm.module.css'

export function SignInForm() {
  const { functions, form } = useSignInForm()

  return (
    <div className={styles.form_container}>
      <Typography>Sign In</Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('email')}
          error={form.formState.errors.email?.message}
          label="Email"
        />

        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}
