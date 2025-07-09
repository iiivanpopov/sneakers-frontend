import clsx from 'clsx'
import { toast as sonner } from 'sonner'
import styles from './Toast.module.css'

function show(message: string, className: string, duration = 3000) {
  sonner.custom(t => {
    setTimeout(() => sonner.dismiss(t), duration)

    return (
      <div className={className} onClick={() => sonner.dismiss(t)} role="alert">
        {message}
      </div>
    )
  })
}

export const toast = {
  success: (message: string, duration?: number) =>
    show(message, clsx(styles.toast, styles.success), duration),

  error: (message: string, duration?: number) =>
    show(message, clsx(styles.toast, styles.error), duration)
}
