import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import React, {
  createContext,
  memo,
  use,
  useId,
  useMemo,
  useState
} from 'react'
import styles from './Checkbox.module.css'

interface CheckboxContextProps {
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
  onCheck?: (isChecked: boolean) => void
  isDisabled: boolean
  id: string
}

const CheckboxContext = createContext<CheckboxContextProps>(
  {} as CheckboxContextProps
)

const useCheckbox = () => use(CheckboxContext)

interface CheckboxProviderProps {
  children: ReactNode
  onCheck?: (isChecked: boolean) => void
  defaultIsChecked?: boolean
  checked?: boolean
  isDisabled?: boolean
}

function CheckboxProvider({
  defaultIsChecked,
  checked,
  onCheck,
  children,
  isDisabled
}: CheckboxProviderProps) {
  const [internalIsChecked, setInternalIsChecked] = useState(
    defaultIsChecked ?? false
  )
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalIsChecked
  const id = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return
    const newChecked = e.target.checked
    if (!isControlled) {
      setInternalIsChecked(newChecked)
    }
    if (onCheck) {
      onCheck(newChecked)
    }
  }

  const value = useMemo(
    () => ({
      isChecked,
      setIsChecked: isControlled ? () => {} : setInternalIsChecked,
      onCheck,
      isDisabled: isDisabled ?? false,
      id
    }),
    [isChecked, isControlled, id]
  )

  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        style={{ position: 'absolute', left: '-9999px' }}
      />
      <CheckboxContext value={value}>{children}</CheckboxContext>
    </>
  )
}

const Label = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => {
    const { id, isDisabled } = useCheckbox()

    return (
      <label
        htmlFor={id}
        className={clsx(
          styles.label,
          { [styles.labelDisabled]: isDisabled },
          className
        )}
      >
        {children}
      </label>
    )
  }
)

interface BoxProps {
  className?: string
}

const Box = memo(({ className }: BoxProps) => {
  const { isChecked, id, isDisabled } = useCheckbox()

  return (
    <label
      htmlFor={id}
      className={clsx(
        styles.box,
        {
          [styles.active]: isChecked,
          [styles.inactive]: !isChecked,
          [styles.disabled]: isDisabled
        },
        className
      )}
    >
      {isChecked && 'X'}
    </label>
  )
})

interface CheckboxProps extends CheckboxProviderProps {}

function Checkbox({ children, ...props }: CheckboxProps) {
  return <CheckboxProvider {...props}>{children}</CheckboxProvider>
}

Checkbox.Label = Label
Checkbox.Box = Box

export { Checkbox }
