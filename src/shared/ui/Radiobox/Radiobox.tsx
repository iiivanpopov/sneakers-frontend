import type {
  Dispatch,
  MouseEvent,
  ReactNode,
  RefObject,
  SetStateAction
} from 'react'
import clsx from 'clsx'
import {
  createContext,
  memo,
  use,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from 'react'
import styles from './Radiobox.module.css'

interface RadioboxContextProps {
  selected: string
  onSelect?: (selected: string) => void
  boxes: RefObject<HTMLDivElement[]>
  setSelected: Dispatch<SetStateAction<string>>
  disabled?: boolean
}

const RadioboxContext = createContext<RadioboxContextProps>(
  {} as RadioboxContextProps
)

const useRadiobox = () => use(RadioboxContext)

interface RadioboxProviderProps {
  children: ReactNode
  onSelect?: (selected: string) => void
  defaultSelected?: string
  disabled?: boolean
}

function RadioboxProvider({
  children,
  onSelect,
  disabled,
  defaultSelected = ''
}: RadioboxProviderProps) {
  const [selected, setSelected] = useState<string>(defaultSelected)
  const boxes = useRef<HTMLDivElement[]>([])

  const value = useMemo(
    () => ({
      boxes,
      onSelect,
      selected,
      setSelected,
      disabled
    }),
    [disabled, onSelect, selected]
  )

  return <RadioboxContext value={value}>{children}</RadioboxContext>
}

interface GroupProps {
  children: ReactNode
  className?: string
}

const Group = memo(({ children, className }: GroupProps) => {
  return <div className={clsx(styles.group, className)}>{children}</div>
})

interface RadioboxProps {
  children: ReactNode
  disabled?: boolean
  onSelect?: (selected: string) => void
  className?: string
  defaultSelected?: string
}

function Radiobox({ children, className, ...props }: RadioboxProps) {
  return (
    <RadioboxProvider {...props}>
      <div className={clsx(styles.radiobox, className)}>{children}</div>
    </RadioboxProvider>
  )
}

interface BoxProps {
  children: string | number
  className?: string
  variant?: 'square' | 'circle'
  disabled?: boolean
}

const Box = memo(
  ({ children, disabled = false, className, variant = 'square' }: BoxProps) => {
    const radiobox = useRadiobox()
    const ref = useRef<HTMLDivElement>(null)
    const id = useId()

    useEffect(() => {
      if (!ref.current) return

      radiobox.boxes.current.push(ref.current)

      if (radiobox.selected === children.toString()) {
        ref.current.setAttribute('data-selected', 'true')
      }

      return () => {
        radiobox.boxes.current = radiobox.boxes.current.filter(
          box => box !== ref.current
        )
      }
    }, [radiobox.boxes, children])

    const handleSelect = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (radiobox.disabled || disabled) return

        const target = e.currentTarget
        if (!target.dataset.value) return

        const isSelected = target.dataset.selected === 'true'
        const newValue = isSelected ? '' : target.dataset.value

        radiobox.setSelected(newValue)
        radiobox.onSelect?.(newValue)

        radiobox.boxes.current.forEach(box =>
          box.setAttribute(
            'data-selected',
            box === target ? String(!isSelected) : 'false'
          )
        )
      },
      [radiobox, disabled]
    )

    return (
      <div
        ref={ref}
        id={id}
        data-value={children}
        data-disabled={String(disabled)}
        onClick={handleSelect}
        data-selected={String(radiobox.selected === children.toString())}
        className={clsx(
          styles.box,
          { [styles.disabled]: radiobox.disabled || disabled },
          styles[variant],
          className
        )}
      />
    )
  }
)

interface LabelProps {
  children: ReactNode
  className?: string
}

const Label = memo(({ children, className }: LabelProps) => {
  return <span className={clsx(styles.label, className)}>{children}</span>
})

Radiobox.Group = Group
Radiobox.Box = Box
Radiobox.Label = Label

export { Radiobox }
