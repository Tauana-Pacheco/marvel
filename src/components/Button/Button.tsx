import { ReactNode } from "react"

interface IButton {
  ariaLabel: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export default function Button({
  className,
  children,
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
      {children}
    </button>
  )
}
