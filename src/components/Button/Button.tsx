import { ReactNode } from "react"

interface IButton {
  ariaLabel: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  children?: ReactNode
}

export default function Button({ children, disabled, onClick, type }: IButton) {
  return (
    <button disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
