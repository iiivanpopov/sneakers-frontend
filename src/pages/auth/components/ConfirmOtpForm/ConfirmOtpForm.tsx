import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import styles from './ConfirmOtpForm.module.css'
import { useConfirmOtpForm } from './hooks/useConfirmOtpForm'

export function ConfirmOtpForm() {
  const { form, functions, state } = useConfirmOtpForm()
  const { formatMessage } = useIntl()

  return (
    <div className={styles.formContainer}>
      <Typography>
        <FormattedMessage id="confirmOtp" />
      </Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('email')}
          error={form.formState.errors.email?.message}
          label={formatMessage({ id: 'label.email' })}
          disabled
        />
        <Input
          {...form.register('code')}
          error={form.formState.errors.code?.message}
          label={formatMessage({ id: 'label.otp' })}
          hint={formatMessage({ id: 'hint.checkEmail' })}
        />
        <Button type="submit">
          <FormattedMessage id="button.continue" />
        </Button>
      </form>
      <div>
        <Button
          variant="text"
          disabled={!!state.retryIn}
          onClick={functions.resendCode}
          className={styles.resendCode}
        >
          <FormattedMessage id="button.resendCode" />
        </Button>
        {state.retryIn}
      </div>
    </div>
  )
}
