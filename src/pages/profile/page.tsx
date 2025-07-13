import { memo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Typography } from '@/shared/ui/Typography'

import { useFormatValidationError } from '../../shared/hooks/useFormatError'
import { useProfilePage } from './hooks/useProfilePage'
import styles from './page.module.css'

export const ProfilePage = memo(() => {
  const { form, state, functions } = useProfilePage()
  const { formatMessage } = useIntl()

  return (
    <section className={styles.profile} aria-labelledby="profile-title">
      <Typography id="profile-title" tag="h2">
        <FormattedMessage id="profile.title" />
      </Typography>
      <form
        className={styles.editForm}
        onSubmit={functions.onSubmit}
        noValidate
      >
        <fieldset className={styles.inputsGroup} disabled={state.isLoading}>
          <Input
            {...form.register('firstName')}
            error={useFormatValidationError(form, 'firstName')}
            label={formatMessage({ id: 'label.firstName' })}
            className={styles.input}
            required
            aria-required="true"
          />
          <Input
            {...form.register('middleName')}
            error={useFormatValidationError(form, 'middleName')}
            className={styles.input}
            label={formatMessage({ id: 'label.middleName' })}
          />
          <Input
            {...form.register('lastName')}
            error={useFormatValidationError(form, 'lastName')}
            className={styles.input}
            label={formatMessage({ id: 'label.lastName' })}
            required
            aria-required="true"
          />
          <Input
            {...form.register('email')}
            error={useFormatValidationError(form, 'email')}
            className={styles.input}
            label={formatMessage({ id: 'label.email' })}
            type="email"
            required
            aria-required="true"
          />
        </fieldset>
        <fieldset className={styles.inputsGroup} disabled={state.isLoading}>
          <Input
            {...form.register('country')}
            error={useFormatValidationError(form, 'country')}
            className={styles.input}
            label={formatMessage({ id: 'label.country' })}
            required
            aria-required="true"
          />
          <Input
            {...form.register('city')}
            error={useFormatValidationError(form, 'city')}
            className={styles.input}
            label={formatMessage({ id: 'label.city' })}
            required
            aria-required="true"
          />
        </fieldset>
        <div className={styles.actions}>
          <Button
            className={styles.submit}
            type="submit"
            disabled={state.isLoading || !form.formState.isValid}
          >
            <FormattedMessage id="button.submit" />
          </Button>
        </div>
      </form>
    </section>
  )
})
