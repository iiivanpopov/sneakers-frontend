import { useRef } from 'react'
import { useClickOutside } from '@/shared/hooks'

interface ModalListProps<T> {
  items: T[]
  isOpened: boolean
  setIsOpened: (open: boolean) => void
  triggerButtonId: string
  modalClassName: string
  children: (item: T, index: number) => React.ReactNode
}

export function ModalList<T>({
  items,
  isOpened,
  setIsOpened,
  triggerButtonId,
  modalClassName,
  children
}: ModalListProps<T>) {
  const ref = useRef<HTMLDivElement>(null!)
  useClickOutside(ref, event => {
    const target = (event.target as HTMLDivElement | null)?.closest(
      `#${triggerButtonId}`
    ) as HTMLDivElement | null
    if (!target) setIsOpened(false)
  })
  if (!isOpened) return null

  return (
    <div ref={ref} className={modalClassName}>
      {items.map((item, i) => children(item, i))}
    </div>
  )
}
