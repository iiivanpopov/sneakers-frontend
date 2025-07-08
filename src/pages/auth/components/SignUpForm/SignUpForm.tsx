import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import { useStage } from '../../contexts/stage'
import styles from './SignUpForm.module.css'

export function SignUpForm() {
  const { setStage } = useStage()
  const functions = {} as any
  const form = {} as any

  return (
    <div className={styles.form_container}>
      <Typography>Sign Up</Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('name')}
          error={form.formState.errors.name?.message}
          label="Name"
        />
        <Input
          {...form.register('email')}
          error={form.formState.errors.email?.message}
          label="Email"
        />
        <Input
          {...form.register('phone')}
          error={form.formState.errors.phone?.message}
          label="Phone"
        />
        <Input
          {...form.register('password')}
          error={form.formState.errors.password?.message}
          label="Password"
          type="password"
          hint="Password must be at least 6 characters long"
        />
        <Input
          error={form.formState.errors.passwordConfirmation?.message}
          {...form.register('passwordConfirmation')}
          type="password"
          label="Password confirmation"
        />
        <Button type="submit">Continue</Button>
      </form>

      <span>Have an account?</span>
      <Button variant="link" onClick={() => setStage('signIn')}>
        Sign In
      </Button>
    </div>
  )
}
