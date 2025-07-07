import type { ReactNode } from 'react'
import clsx from 'clsx'
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import styles from './Dropdown.module.css'

interface DropdownContextType {
  value: string
  onChange: (value: string) => void
  isOpen: boolean
  onToggle: (open: boolean) => void
}

const DropdownContext = createContext<DropdownContextType>(
  null as unknown as DropdownContextType
)

const useDropdownContext = () => use(DropdownContext)

interface DropdownItemProps {
  value: string
  children: ReactNode
}

function DropdownItem({ value, children }: DropdownItemProps) {
  const { value: selected, onChange, onToggle } = useDropdownContext()

  const handleClick = useCallback(() => {
    onChange(value)
    onToggle(false)
  }, [value, onChange, onToggle])

  return (
    <div
      data-value={value}
      onClick={handleClick}
      className={clsx('dropdown-item', styles.item, {
        [styles.active]: selected === value
      })}
    >
      {children}
    </div>
  )
}

function DropdownItems({ children }: { children: ReactNode }) {
  const { isOpen } = useDropdownContext()
  if (!isOpen) return null
  return <div className={styles.items}>{children}</div>
}

function DropdownValue({ label }: { label: ReactNode }) {
  const { isOpen, onToggle, value } = useDropdownContext()
  const toggle = useCallback(() => onToggle(!isOpen), [isOpen, onToggle])

  return (
    <div
      onClick={toggle}
      className={clsx(styles.value, { [styles.opened]: isOpen })}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
      aria-expanded={isOpen}
    >
      {label || value}
    </div>
  )
}

function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className={styles.label}>{children}</div>
}

interface DropdownProps {
  children: ReactNode
  value: string
  onChange: (value: string) => void
}

function Dropdown({ children, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const onToggle = useCallback((open: boolean) => setIsOpen(open), [])

  const contextValue = useMemo(
    () => ({
      value,
      onChange,
      isOpen,
      onToggle
    }),
    [value, onChange, isOpen, onToggle]
  )

  return (
    <DropdownContext value={contextValue}>
      <div className={styles.dropdown} ref={containerRef}>
        {children}
      </div>
    </DropdownContext>
  )
}

Dropdown.Value = DropdownValue
Dropdown.Items = DropdownItems
Dropdown.Label = DropdownLabel
Dropdown.Item = DropdownItem

export { Dropdown }
