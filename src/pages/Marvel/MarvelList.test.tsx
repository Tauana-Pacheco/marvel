import { render, screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"
import { MarvelList } from "./MarvelList"
import { fetchCharacters } from "../../utils"
import { Mock, vi } from "vitest"
import { listOfCharactersMock } from "./__mocks__/characters"

vi.mock("../../utils", () => ({
  fetchCharacters: vi.fn(),
}))

const queryClient = new QueryClient()

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MarvelList />
      </BrowserRouter>
    </QueryClientProvider>
  )

describe("<MarvelList />", () => {
  beforeEach(() => {
    queryClient.clear()
  })

  it("should render characters list", async () => {
    ;(fetchCharacters as Mock).mockImplementationOnce(() =>
      Promise.resolve(listOfCharactersMock)
    )

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText("A.I.M.")).toBeInTheDocument()
      expect(
        screen.getByText(
          "AIM is a terrorist organization bent on destroying the world."
        )
      ).toBeInTheDocument()

      expect(screen.getByText("Absorbing Man")).toBeInTheDocument()
      expect(
        screen.getByText("Nenhuma descrição disponíveln :/")
      ).toBeInTheDocument()
    })
  })
})
