import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@/shared/ui/common/Button'
import { Input } from '@/shared/ui/common/Input'
import { Typography } from '@/shared/ui/common/Typography'
import { useFormatError } from '../../shared/hooks/useFormatError'

import { useProfilePage } from './hooks/useProfilePage'
import styles from './page.module.css'

export function ProfilePage() {
  const { form, functions } = useProfilePage()
  const { formatMessage } = useIntl()

  return (
    <section className={styles.profile}>
      <Typography>
        <FormattedMessage id="profile.title" />
      </Typography>
      <form className={styles.editForm} onSubmit={functions.onSubmit}>
        <div className={styles.inputsGroup}>
          <Input
            {...form.register('firstName')}
            error={useFormatError(form, 'firstName')}
            label={formatMessage({ id: 'label.firstName' })}
            className={styles.input}
          />
          <Input
            {...form.register('middleName')}
            error={useFormatError(form, 'middleName')}
            className={styles.input}
            label={formatMessage({ id: 'label.middleName' })}
          />
          <Input
            {...form.register('lastName')}
            error={useFormatError(form, 'lastName')}
            className={styles.input}
            label={formatMessage({ id: 'label.lastName' })}
          />
        </div>
        <div className={styles.inputsGroup}>
          <Input
            {...form.register('country')}
            error={useFormatError(form, 'country')}
            className={styles.input}
            label={formatMessage({ id: 'label.country' })}
          />
          <Input
            {...form.register('city')}
            error={useFormatError(form, 'city')}
            className={styles.input}
            label={formatMessage({ id: 'label.city' })}
          />
        </div>
        <div className={styles.inputsGroup}>
          <Input
            {...form.register('email')}
            error={useFormatError(form, 'email')}
            className={styles.input}
            label={formatMessage({ id: 'label.email' })}
          />
        </div>
        <Button className={styles.submit} type="submit">
          <FormattedMessage id="button.submit" />
        </Button>
      </form>
    </section>
  )
}
