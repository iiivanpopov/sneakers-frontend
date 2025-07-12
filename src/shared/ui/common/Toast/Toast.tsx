import { m } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { toast as sonner } from 'sonner'

interface ToastProps {
  message: string
  className: string
  duration: number
  toastId: string | number
}

export function Toast({ message, className, duration, toastId }: ToastProps) {
  const [isDismissing, setIsDismissing] = useState(false)
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const disappearTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    dismissTimeoutRef.current = setTimeout(() => {
      setIsDismissing(true)
      disappearTimeoutRef.current = setTimeout(
        () => sonner.dismiss(toastId),
        300
      )
    }, duration)

    return () => {
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current)
      if (disappearTimeoutRef.current) clearTimeout(disappearTimeoutRef.current)
    }
  }, [duration, toastId])

  return (
    <m.div
      initial={{
        translateY: '-200%',
        opacity: 0,
        scale: 0.9
      }}
      animate={{
        translateY: isDismissing ? '200%' : 0,
        opacity: isDismissing ? 0 : 1,
        scale: isDismissing ? 0.9 : 1
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      className={className}
      onClick={() => sonner.dismiss(toastId)}
      role="alert"
    >
      {message}
    </m.div>
  )
}
