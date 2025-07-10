import clsx from 'clsx'
import { memo } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  variant?: 'outlined' | 'contained' | 'text'
} & React.ComponentPropsWithRef<'button'>

export const Button = memo(
  ({
    children,
    type,
    variant = 'contained',
    className,
    ...props
  }: ButtonProps) => {
    return (
      <button
        type={type}
        className={clsx(styles.button, styles[variant], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
