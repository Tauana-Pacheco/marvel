import { ReactNode } from "react"

interface IButton {
  ariaLabel: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  label?: ReactNode
  className?: string
  children?: ReactNode
}

export default function Button({
  className,
  children,
  label,
  disabled,
  onClick,
  type,
}: IButton) {
  return (
    <button
      className={className}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  )
}
