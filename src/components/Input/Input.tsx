import { ChangeEvent } from "react"
import clsx from "clsx"
export interface IInput {
  ariaLabel: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: "text" | "email" | "password"
  className?: string
}

const baseStyles =
  "bg-transparent w-full placeholder-gray-500 placeholder-opacity-75 mr-2 py-1 px-2 focus:outline-none"

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
      className={clsx(baseStyles, className)}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  )
}
