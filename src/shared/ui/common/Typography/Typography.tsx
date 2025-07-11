import clsx from 'clsx'
import { memo } from 'react'
import styles from './Typography.module.css'

type Tag = 'h1' | 'h2' | 'h3' | 'div' | 'span'

type TypographyProps<T extends React.ElementType = 'h1'> = {
  tag?: Tag
  variant?: 'title' | 'subtitle' | 'body' | 'comment'
} & React.ComponentProps<T>

export const Typography = memo(
  ({ tag = 'h1', variant = 'title', className, children }: TypographyProps) => {
    const Component = tag

    return (
      <Component className={clsx(styles[variant], className)}>
        {children}
      </Component>
    )
  }
)
