import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@/shared/ui/common/Button/Button'
import { Input } from '@/shared/ui/common/Input/Input'
import { Typography } from '@/shared/ui/common/Typography/Typography'
import { useSignInForm } from './hooks/useSignInForm'
import styles from './SignInForm.module.css'

export function SignInForm() {
  const { functions, form } = useSignInForm()
  const { formatMessage } = useIntl()

  return (
    <div className={styles.formContainer}>
      <Typography>
        <FormattedMessage id="signIn" />
      </Typography>
      <form onSubmit={functions.onSubmit} className={styles.form}>
        <Input
          {...form.register('email')}
          error={form.formState.errors.email?.message}
          label={formatMessage({ id: 'label.email' })}
        />

        <Button type="submit">
          <FormattedMessage id="button.continue" />
        </Button>
      </form>
    </div>
  )
}
