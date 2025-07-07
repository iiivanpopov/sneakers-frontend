import clsx from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'contained' | 'text' | 'link'
  action?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  action = 'primary',
  disabled = false,
  type = 'button',
  ...props
}) => (
  <button
    className={clsx(
      styles.button,
      styles[`${action}_${variant}`],
      variant === 'link' ? styles.link : undefined
    )}
    disabled={disabled}
    type={type}
    {...props}
  >
    {children}
  </button>
)
