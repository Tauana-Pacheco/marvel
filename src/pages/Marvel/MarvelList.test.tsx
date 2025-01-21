import { render, screen, waitFor } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { MarvelList } from "./MarvelList"
import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { listOfCharacters } from "./mocks/characters"

vi.mock("./utils", () => ({
  fetchCharacters: vi.fn(() =>
    Promise.resolve({
      data: {
        listOfCharacters,
      },
    })
  ),
})) // mockar o react-query?

const renderWithClient = (ui: ReactNode) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe.skip("<MarvelList", () => {
  it("should list of characters", async () => {
    renderWithClient(<MarvelList />)

    await waitFor(() => {
      expect(
        screen.queryByText("Pera, os herois já estão chegando")
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText("Iron Man")).toBeInTheDocument()
    })
  })
})
