import { ChangeEvent } from "react"

export interface IInput {
  ariaLabel: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: "text" | "email" | "password"
  className?: string
}

export default function Input({
  ariaLabel,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: IInput) {
  return (
    <input
      aria-label={ariaLabel}
      value={value}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  )
}
