import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Input, { IInput } from "./Input"

const mockFn = vi.fn()

describe("<Input/>", () => {
  it("should render the input with the correct placeholder and value", () => {
    const mockProps: IInput = {
      ariaLabel: "test-input",
      onChange: mockFn,
      placeholder: "Enter text",
      type: "text",
      value: "Initial Value",
    }

    render(<Input {...mockProps} />)

    const inputElement = screen.getByPlaceholderText(/enter text/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue("Initial Value")
  })

  it("should accept different input types", () => {
    const mockProps: IInput = {
      ariaLabel: "password-input",
      onChange: mockFn,
      placeholder: "Enter password",
      type: "password",
      value: "",
    }

    render(<Input {...mockProps} />)

    const inputElement = screen.getByPlaceholderText(/enter password/i)
    expect(inputElement).toHaveAttribute("type", "password")
  })
})
