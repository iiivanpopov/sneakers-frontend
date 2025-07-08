import clsx from 'clsx'
import styles from './Button.module.css'

type ButtonProps<T extends React.ElementType = 'button'> = {
  variant?: 'outlined' | 'contained' | 'text' | 'link'
  tag?: T
} & React.ComponentPropsWithRef<T>

export function Button<T extends React.ElementType = 'button'>({
  children,
  variant = 'contained',
  tag,
  className,
  ...props
}: ButtonProps<T>) {
  const Component = tag || 'button'
  return (
    <Component
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
