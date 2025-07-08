import clsx from 'clsx'
import styles from './Typography.module.css'

type Tag = 'h1' | 'h2' | 'h3' | 'div' | 'span'

type TypographyProps<T extends React.ElementType = 'h1'> = {
  tag?: Tag
  variant?: 'title' | 'subtitle' | 'body' | 'comment'
} & React.ComponentProps<T>

export function Typography<T extends React.ElementType = 'h1'>({
  tag = 'h1',
  variant = 'title',
  className,
  children
}: TypographyProps<T>) {
  const Component = tag

  return (
    <Component className={clsx(styles[variant], className)}>
      {children}
    </Component>
  )
}
