import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Card from "./Card"

describe("<Card />", () => {
  it("should render some content", () => {
    render(<Card id="card">lorem</Card>)
    expect(screen.getByText("lorem")).toBeInTheDocument()
  })
})
