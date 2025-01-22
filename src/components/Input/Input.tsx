import { ChangeEvent } from "react"

export interface IInput {
  ariaLabel: string
  id: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: "text" | "email" | "password"
}

export default function Input({
  ariaLabel,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: IInput) {
  return (
    <input
      aria-label={ariaLabel}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  )
}
