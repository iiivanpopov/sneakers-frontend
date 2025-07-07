import clsx from 'clsx'

import React, { useId } from 'react'
import styles from './Input.module.css'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  error?: string
  label?: string
  hint?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  ...props
}) => {
  const id = useId()

  return (
    <div className={styles.input_wrapper}>
      {!!label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={clsx(styles.input, { [styles.input_error]: !!error })}
        id={id}
        {...props}
      />
      {!!error && <span className={styles.error}>{error}</span>}
      {!!hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}
