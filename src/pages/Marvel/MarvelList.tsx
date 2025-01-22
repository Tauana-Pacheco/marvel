import { useState, ChangeEvent, FormEvent } from "react"
import { useSearchParams } from "react-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import "./MarvelList.css"
import { fetchCharacters } from "../../utils"
import { ICharacter } from "./types"
import Card from "../../components/Card"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { MARVEL_LIST as dict } from "./dict"

export function MarvelList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState("")
  const searchValue = searchParams.get("search") || ""

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["characters", searchValue],
    queryFn: fetchCharacters,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, total } = lastPage.data
      const nextOffset = offset + limit
      return nextOffset < total ? nextOffset : undefined
    },
  })
  if (status === "pending") {
    return <div data-testid="loading">{dict.isLoading}</div>
  }

  if (status === "error") {
    return <div>Ihh deu ruim :/</div>
  }

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value)
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSearchParams((state) => {
      if (inputValue) {
        state.set("search", inputValue)
      } else {
        state.delete("search")
      }
      return state
    })
    refetch()
  }

  const handleClearSearch = () => {
    setInputValue("")
    setSearchParams((state) => {
      state.delete("search")
      return state
    })
    refetch()
  }

  const noResults = data?.pages?.[0]?.data?.results.length === 0
  const isSearchEmpty = noResults && searchValue

  let buttonText
  if (isFetchingNextPage) {
    buttonText = dict.loadingMore
  } else if (hasNextPage) {
    buttonText = dict.loadMore
  } else {
    buttonText = dict.noLoading
  }

  const disabledButton = !hasNextPage || isFetchingNextPage

  return (
    <div>
      <header>{dict.header}</header>
      <h1>{dict.welcome}</h1>
      <form onSubmit={handleSearchSubmit}>
        <Input
          ariaLabel="input"
          type="text"
          id="input-search"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder={dict.searchHero}
        />
        <Button ariaLabel="busca" label={dict.search} type="submit" />
        {noResults && (
          <Button
            ariaLabel="limpar pesquisa"
            label={dict.cleanSearch}
            onClick={handleClearSearch}
          />
        )}
      </form>
      {isSearchEmpty && (
        <p data-testid="character-not-found">{dict.characterNotFound}</p>
      )}

      <ul>
        {data.pages.map((page, i) => (
          <Card key={i} id="card">
            {page?.data.results?.map((character: ICharacter) => (
              <li key={character.id}>
                <h2>{dict.name}</h2>
                <p>{character.name}</p>

                {character.thumbnail && (
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                )}

                <h2>{dict.description}</h2>
                <p>{character.description || dict.noDescription}</p>

                <h2>{dict.seriesAvailable}</h2>
                <p>{character.series?.available || dict.noResults}</p>

                <h2>{dict.storiesAvailable}</h2>
                <p>{character.stories?.available || dict.noResults}</p>
              </li>
            ))}
          </Card>
        ))}
      </ul>
      {!isSearchEmpty && (
        <Button
          ariaLabel="carrega personagens"
          onClick={fetchNextPage}
          disabled={disabledButton}
          label={buttonText}
        />
      )}
    </div>
  )
}
