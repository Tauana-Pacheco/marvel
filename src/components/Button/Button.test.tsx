import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import Button from "./Button"

describe("<Button/>", () => {
  it("should call onClick when the button is clicked", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button ariaLabel="test-button" onClick={handleClick} label="click me" />
    )
    const buttonElement = screen.getByRole("button", { name: /click me/i })
    await user.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should disable the button when the disabled prop is true", () => {
    render(<Button ariaLabel="test-button" disabled label="click me" />)
    const buttonElement = screen.getByRole("button", { name: /click me/i })
    expect(buttonElement).toBeDisabled()
  })

  it("should set the button type based on the type prop", () => {
    render(<Button ariaLabel="test-button" type="submit" label="Submit" />)
    const buttonElement = screen.getByRole("button", { name: /submit/i })
    expect(buttonElement).toHaveAttribute("type", "submit")
  })
})
