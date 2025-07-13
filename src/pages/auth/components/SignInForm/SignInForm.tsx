import { memo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFormatValidationError } from '@/shared/hooks/useFormatError'
import { Button, Input, Typography } from '@/shared/ui'
import { useSignInForm } from './hooks/useSignInForm'
import styles from './SignInForm.module.css'

export const SignInForm = memo(() => {
  const { form, state, functions } = useSignInForm()
  const { formatMessage } = useIntl()

  return (
    <section className={styles.formContainer} aria-labelledby="sign-in-title">
      <Typography id="sign-in-title" tag="h2">
        <FormattedMessage id="signIn" />
      </Typography>
      <form onSubmit={functions.onSubmit} className={styles.form} noValidate>
        <fieldset disabled={state.isLoading}>
          <Input
            {...form.register('email')}
            error={useFormatValidationError(form, 'email')}
            label={formatMessage({ id: 'label.email' })}
            type="email"
            required
            aria-required="true"
            autoFocus
            placeholder={formatMessage({ id: 'placeholder.email' })}
          />
        </fieldset>
        <div className={styles.actions}>
          <Button
            type="submit"
            disabled={state.isLoading || !form.formState.isValid}
          >
            <FormattedMessage id="button.continue" />
          </Button>
        </div>
      </form>
    </section>
  )
})
