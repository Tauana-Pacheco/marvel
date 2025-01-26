import { render, screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"
import { MarvelList } from "./MarvelList"
import { Mock, vi } from "vitest"
import { fetchCharacters } from "./utils"

vi.mock("./utils", () => ({
  fetchCharacters: vi.fn(),
}))

const mockData = {
  data: {
    results: [
      {
        id: 1,
        name: "Spider-Man",
        description: "Friendly neighborhood Spider-Man.",
        thumbnail: { path: "spider-man-image", extension: "jpg" },
        comics: { items: [{ name: "Amazing Fantasy #15" }] },
        series: { items: [{ name: "Spider-Man Series" }] },
      },
      {
        id: 2,
        name: "Iron Man",
        description: "Genius, billionaire, playboy, philanthropist.",
        thumbnail: { path: "iron-man-image", extension: "png" },
        comics: { items: [{ name: "Iron Man #1" }] },
        series: { items: [{ name: "Iron Man Series" }] },
      },
    ],
    offset: 0,
    limit: 2,
    total: 2,
  },
}

const queryClient = new QueryClient()

describe("MarvelList Component", () => {
  it("should display a list of characters", async () => {
    ;(fetchCharacters as Mock).mockResolvedValueOnce(mockData)

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MarvelList />
        </BrowserRouter>
      </QueryClientProvider>
    )

    screen.debug(undefined, Infinity)
    expect(screen.getByTestId("loading")).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.getByText("Spider-Man")).toBeInTheDocument()
    )

    await waitFor(() =>
      expect(screen.getByText("Iron Man")).toBeInTheDocument()
    )
  })
})
