import clsx from 'clsx'
import { toast as sonner } from 'sonner'
import { Toast } from './Toast'
import styles from './Toast.module.css'

export function show(message: string, className: string, duration = 3000) {
  sonner.custom(t => (
    <Toast
      message={message}
      className={className}
      duration={duration}
      toastId={t}
    />
  ))
}

export const toast = {
  success: (message: string, duration?: number) =>
    show(message, clsx(styles.toast, styles.success), duration),
  error: (message: string, duration?: number) =>
    show(message, clsx(styles.toast, styles.error), duration)
}
