import type React from 'react'
import clsx from 'clsx'
import { memo, useId } from 'react'
import styles from './Input.module.css'

type Tag = 'input' | 'textarea'
type InputProps<T extends React.ElementType = 'input'> = {
  children?: React.ReactNode
  tag?: Tag
  label?: string
  hint?: string
  error?: string
} & React.ComponentPropsWithRef<T>

export const Input = memo(
  <T extends React.ElementType = 'input'>({
    tag,
    label,
    hint,
    className,
    error,
    ...props
  }: InputProps<T>) => {
    const Component = tag || 'input'
    const id = useId()

    return (
      <div className={styles.input_wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <Component
          id={id}
          className={clsx(styles.input, className, {
            [styles.input_error]: !!error
          })}
          {...props}
        />
        {hint && !error && <span className={styles.hint}>{hint}</span>}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  }
)
