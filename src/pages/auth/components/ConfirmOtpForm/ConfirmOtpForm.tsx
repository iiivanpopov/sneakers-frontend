import { memo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFormatValidationError } from '@/shared/hooks/useFormatError'
import { Button, Input, Typography } from '@/shared/ui'
import styles from './ConfirmOtpForm.module.css'
import { useConfirmOtpForm } from './hooks/useConfirmOtpForm'

export const ConfirmOtpForm = memo(() => {
  const { form, state, functions } = useConfirmOtpForm()
  const { formatMessage } = useIntl()

  return (
    <section
      className={styles.formContainer}
      aria-labelledby="confirm-otp-title"
    >
      <Typography id="confirm-otp-title" tag="h2">
        <FormattedMessage id="confirmOtp" />
      </Typography>
      <form onSubmit={functions.onSubmit} className={styles.form} noValidate>
        <fieldset className={styles.fieldset} disabled={state.isLoading}>
          <Input
            {...form.register('email')}
            error={useFormatValidationError(form, 'email')}
            label={formatMessage({ id: 'label.email' })}
            type="email"
            disabled
            aria-disabled="true"
          />
          <Input
            {...form.register('code')}
            error={useFormatValidationError(form, 'code')}
            label={formatMessage({ id: 'label.otp' })}
            hint={formatMessage({ id: 'hint.checkEmail' })}
            type="text"
            inputMode="numeric Ascending numeric"
            required
            aria-required="true"
            maxLength={6}
            autoFocus
          />
        </fieldset>
        <div className={styles.actions}>
          <Button
            type="submit"
            className={styles.submit}
            disabled={state.isLoading || !form.formState.isValid}
          >
            <FormattedMessage id="button.continue" />
          </Button>
          <Button
            variant="text"
            disabled={state.isLoading || !!state.retryIn}
            onClick={e => {
              e.preventDefault()
              functions.onResendCode()
            }}
            className={styles.resendCode}
          >
            <FormattedMessage id="button.resendCode" />
            {state.retryIn && (
              <span className={styles.retryTimer}>
                {formatMessage(
                  { id: 'label.retryIn' },
                  { seconds: state.retryIn }
                )}
              </span>
            )}
          </Button>
        </div>
      </form>
    </section>
  )
})
