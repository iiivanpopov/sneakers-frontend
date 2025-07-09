import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import styles from './ConfirmOtpForm.module.css'
import { useConfirmOtpForm } from './hooks/useConfirmOtpForm'

export function ConfirmOtpForm() {
  const { form, functions, state } = useConfirmOtpForm()

  return (
    <div className={styles.form_container}>
      <Typography>Confirm OTP</Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('email')}
          error={form.formState.errors.email?.message}
          label="Email"
          disabled
        />
        <Input
          {...form.register('code')}
          error={form.formState.errors.code?.message}
          label="One time password"
          hint="Check your email"
        />
        <Button type="submit">Continue</Button>
      </form>
      <div>
        <Button
          variant="text"
          disabled={!!state.retryIn}
          onClick={functions.resendCode}
        >
          Resend code
        </Button>
        {state.retryIn}
      </div>
    </div>
  )
}
