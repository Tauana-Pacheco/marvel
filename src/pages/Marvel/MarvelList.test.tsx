import { screen, waitFor } from "@testing-library/react"
import { MarvelList } from "./MarvelList"
import { vi } from "vitest"
import { renderWithProviders } from "../../services/tests/index"
import { fetchCharacters } from "./utils"
import { listOfCharactersMock } from "./__mocks__/characters"

vi.mock("./utils", () => ({
  fetchCharacters: vi.fn(),
}))

const mockedFetchCharacters = vi.mocked(fetchCharacters)

describe("<MarvelList />", () => {
  it("should display an error message when the request fails", async () => {
    vi.mock("./utils", () => ({
      fetchCharacters: vi
        .fn()
        .mockRejectedValueOnce(new Error("Erro na requisição")),
    }))

    renderWithProviders(<MarvelList />)

    await waitFor(() => {
      expect(screen.queryByText(/Ihh deu ruim/i)).toBeInTheDocument()
    })
  })

  it("should display a list of characters", async () => {
    mockedFetchCharacters.mockResolvedValueOnce(listOfCharactersMock)

    renderWithProviders(<MarvelList />)
    expect(screen.getByTestId("loading")).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText("Spider-Man")).toBeInTheDocument()
      expect(screen.queryByText("Iron Man")).toBeInTheDocument()
    })
  })
})
