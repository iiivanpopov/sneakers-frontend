import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import styles from './ConfirmOtpForm.module.css'

export function ConfirmOtpForm() {
  const functions = {} as any
  const form = {} as any

  return (
    <div className={styles.form_container}>
      <Typography>Confirm OTP</Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('otp')}
          error={form.formState.errors.otp?.message}
          label="One time password"
          hint="Check your email"
        />
        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}
