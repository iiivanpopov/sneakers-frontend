import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import { useStage } from '../../contexts/stage'
import styles from './SignInForm.module.css'

export function SignInForm() {
  const { setStage } = useStage()
  const functions = {} as any
  const form = {} as any

  return (
    <div className={styles.form_container}>
      <Typography>Sign In</Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('identifier')}
          error={form.formState.errors.identifier?.message}
          label="Identifier"
          hint="Name or Email"
        />
        <Input
          {...form.register('password')}
          error={form.formState.errors.password?.message}
          label="Password"
          type="password"
        />
        <Button type="submit">Continue</Button>
      </form>

      <span>Don't have an account?</span>
      <Button variant="link" onClick={() => setStage('signUp')}>
        Sign Up
      </Button>
    </div>
  )
}
