import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { createContext, memo, use, useMemo, useState } from 'react'
import styles from './Checkbox.module.css'

interface CheckboxContextProps {
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
  onCheck?: (isChecked: boolean) => void
  handleCheck?: () => void
  isDisabled: boolean
}

const CheckboxContext = createContext<CheckboxContextProps>(
  {} as CheckboxContextProps
)

const useCheckbox = () => use(CheckboxContext)

interface CheckboxProviderProps {
  children: ReactNode
  onCheck?: (isChecked: boolean) => void
  defaultIsChecked?: boolean
  isDisabled?: boolean
}

function CheckboxProvider({
  defaultIsChecked,
  onCheck,
  children,
  isDisabled
}: CheckboxProviderProps) {
  const [isChecked, setIsChecked] = useState(defaultIsChecked ?? false)

  const handleCheck = () => {
    if (onCheck) onCheck(!isChecked)
    setIsChecked(!isChecked)
  }

  const value = useMemo(
    () => ({
      isChecked,
      setIsChecked,
      onCheck,
      handleCheck,
      isDisabled: isDisabled ?? false
    }),
    [isChecked, isDisabled]
  )

  return <CheckboxContext value={value}>{children}</CheckboxContext>
}

const Label = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => {
    const { isDisabled, handleCheck } = useCheckbox()

    return (
      <span
        onClick={handleCheck}
        className={clsx(
          styles.label,
          { [styles.labelDisabled]: isDisabled },
          className
        )}
      >
        {children}
      </span>
    )
  }
)

interface BoxProps {
  className?: string
  children?: ReactNode
}

const Box = memo(({ className, children }: BoxProps) => {
  const { isChecked, isDisabled, handleCheck } = useCheckbox()

  return (
    <div
      onClick={handleCheck}
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
      {children}
    </div>
  )
})

interface CheckboxProps extends CheckboxProviderProps {
  className?: string
}

function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <CheckboxProvider {...props}>
      <div className={clsx(styles.checkbox, className)}>{children}</div>
    </CheckboxProvider>
  )
}

Checkbox.Label = Label
Checkbox.Box = Box

export { Checkbox }
