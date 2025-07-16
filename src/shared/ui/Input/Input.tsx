import type React from 'react'
import clsx from 'clsx'
import { memo, useId } from 'react'
import styles from './Input.module.css'

type InputProps<T extends React.ElementType = 'input'> = {
  children?: React.ReactNode
  tag?: T
  label?: string
  hint?: string
  error?: string
} & React.ComponentPropsWithRef<T>

export const Input = memo(
  ({ tag, label, hint, className, error, ...props }: InputProps) => {
    const Component = tag || 'input'
    const id = useId()
    const hintId = hint && !error ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = error ? errorId : hintId

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <Component
          id={id}
          className={clsx(styles.input, className, {
            [styles.inputError]: !!error
          })}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        {hint && !error && (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    )
  }
)
