import { ReactNode } from "react"

interface IButton {
  ariaLabel: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  label?: ReactNode
}

export default function Button({ label, disabled, onClick, type }: IButton) {
  return (
    <button disabled={disabled} type={type} onClick={onClick}>
      {label}
    </button>
  )
}
