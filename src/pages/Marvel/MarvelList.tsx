import { useState, ChangeEvent, FormEvent } from "react"
import { useSearchParams } from "react-router"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import "./MarvelList.css"
import { fetchCharacters, fetchComics } from "../../utils"
import { ICharacter, IComics } from "./types"
import Card from "../../components/Card"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { MARVEL_LIST as dict } from "./dict"

export function MarvelList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState("")
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  )
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

  const { data: comicsData, isLoading: isComicsLoading } = useQuery({
    queryKey: ["comics", selectedCharacterId],
    queryFn: () => fetchComics(selectedCharacterId as number),
    enabled: !!selectedCharacterId,
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

  const cleanSearch =
    (data?.pages?.[0]?.data?.results.length > 0 && searchValue) || !hasNextPage
  const disabledButton = !hasNextPage || isFetchingNextPage

  return (
    <div>
      <header>{dict.header}</header>
      <h1 className="text-2xl font-bold">{dict.welcome}</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <Input
          ariaLabel="input"
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder={dict.searchHero}
          className="mr-2"
        />
        <Button
          ariaLabel="busca"
          label={dict.search}
          type="submit"
          className="mr-2"
        />
        {cleanSearch && (
          <Button
            ariaLabel="limpar pesquisa"
            label={dict.cleanSearch}
            onClick={handleClearSearch}
            className="mr-2"
          />
        )}
      </form>
      {isSearchEmpty && (
        <p data-testid="character-not-found">{dict.characterNotFound}</p>
      )}

      <div className="flex flex-row space-x-4">
        <div className="flex-1">
          <ul>
            {data.pages.map((page, i) => (
              <Card key={i} id="card">
                {page?.data.results?.map((character: ICharacter) => (
                  <li
                    key={character.id}
                    onClick={() => setSelectedCharacterId(character.id)}
                    className="cursor-pointer"
                  >
                    <p>{character.name}</p>
                    {character.thumbnail && (
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt="Personagens"
                        className="w-full rounded-lg"
                      />
                    )}
                    <p>{character.description || dict.noDescription}</p>
                  </li>
                ))}
              </Card>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          {selectedCharacterId && (
            <div>
              {isComicsLoading ? (
                <p>aguardando os quadrinhos</p>
              ) : (
                <ul>
                  {comicsData?.data.results.map((comic: IComics) => (
                    <li key={comic.id}>
                      <p>{comic.title}</p>
                      <img
                        src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                        alt="Quadrinhos"
                        className="w-full rounded-lg"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      {!isSearchEmpty && (
        <Button
          ariaLabel="carrega personagens"
          onClick={fetchNextPage}
          disabled={disabledButton}
          label={buttonText}
          className="mt-4"
        />
      )}
    </div>
  )
}

// separar em dois componentes??:
// - pagina princial
// --- Lista de Personagens
// --- Lista de Quadrinhos
