import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useIntl } from 'react-intl'

export function useFormatError<T extends FieldValues, F extends Path<T>>(
  form: UseFormReturn<T>,
  field: F
): string | undefined {
  const { formatMessage } = useIntl()

  const errorMessage = form.formState.errors[field]?.message

  if (!errorMessage) return undefined

  return formatMessage({
    id: `validation.${errorMessage}`
  })
}
