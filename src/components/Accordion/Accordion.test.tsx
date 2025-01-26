import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import Accordion from "./Accordion"
import { describe, it, expect } from "vitest"

describe("<Accordion />", () => {
  it.only("should demonstrate accordion behavior", async () => {
    const user = userEvent.setup()
    render(<Accordion title="Accordion Title">Content</Accordion>)

    await user.click(screen.getByTestId("down-arrow"))
    expect(screen.getByText("Content")).toBeInTheDocument()

    await user.click(screen.getByTestId("up-arrow"))
    expect(screen.queryByText("Content")).not.toBeInTheDocument()
  })
})
