import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { useSearchParams } from "react-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import "./MarvelList.css"
import { fetchCharacters } from "./utils"
import { ICharacter } from "./types"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { MARVEL_LIST as dict } from "./dict"
import Card from "../../components/Card"
import Accordion from "../../components/Accordion"
import { FaSearch } from "react-icons/fa"
import { AiFillCloseSquare } from "react-icons/ai"

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
    queryFn: ({ pageParam = 0, queryKey }) =>
      fetchCharacters({ pageParam, queryKey }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, total } = lastPage.data
      const nextOffset = offset + limit
      return nextOffset < total ? nextOffset : undefined
    },
  })

  useEffect(() => {
    refetch()
  }, [searchParams, refetch])

  if (status === "pending") {
    return <div className="font-mono">{dict.isLoading}</div>
  }

  if (status === "error") {
    return <div className="font-mono">{dict.error}</div>
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
  }

  const handleClearSearch = () => {
    setInputValue("")
    setSearchParams((state) => {
      state.delete("search")
      return state
    })
  }

  const results = data?.pages?.[0]?.data?.results
  const noResults = results.length === 0
  const isSearchEmpty = noResults && searchValue

  let buttonText
  if (isFetchingNextPage) {
    buttonText = dict.loadingMore
  } else if (hasNextPage) {
    buttonText = dict.loadMore
  } else {
    buttonText = dict.noLoading
  }

  const cleanSearch = (results.length > 0 && searchValue) || !hasNextPage
  const disabledButton = !hasNextPage || isFetchingNextPage || !dict.noLoading
  const showSearchButton = inputValue !== ""

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">{dict.title}</h1>
      <h2 className="mb-4">{dict.info}</h2>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex items-center border-b border-gray-400"
      >
        <Input
          ariaLabel="Input: Digite o nome"
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder={dict.searchHero}
          className="w-full"
        />
        {showSearchButton && (
          <Button
            ariaLabel="busca"
            type="submit"
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {<FaSearch size={20} className="text-primary" />}
          </Button>
        )}
        {cleanSearch && (
          <Button
            ariaLabel="Limpar pesquisa"
            onClick={handleClearSearch}
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {<AiFillCloseSquare size={30} className="text-error" />}
          </Button>
        )}
      </form>
      {isSearchEmpty && (
        <div className="pt-6">
          <p data-testid="character-not-found" className="font-mono">
            {dict.characterNotFound}
          </p>
        </div>
      )}

      {data.pages.map((page, i) => (
        <Card key={i} id="card">
          {page?.data.results?.map((character: ICharacter, index: number) => (
            <div key={index} className="mb-8 rounded ">
              <h3 className="text-lg font-mono pb-2 font-semibold">
                {character.name}
              </h3>
              {character.thumbnail && (
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="w-full rounded-lg"
                />
              )}
              <Accordion title={dict.description}>
                <p className="accordion">
                  {character.description || dict.noDescription}
                </p>
              </Accordion>
              <Accordion title={dict.comics}>
                {(character.comics?.items || []).map((item, index) => (
                  <p key={index} className="accordion">
                    {item.name}
                  </p>
                )) || <p>{dict.noDescription}</p>}
              </Accordion>

              <Accordion title={dict.series}>
                {(character.series?.items || []).map((item, index) => (
                  <p key={index} className="accordion">
                    {item.name}
                  </p>
                )) || <p>{dict.noDescription}</p>}
              </Accordion>
            </div>
          ))}
        </Card>
      ))}

      {!isSearchEmpty && (
        <Button
          ariaLabel="Carregar heróis"
          onClick={fetchNextPage}
          disabled={disabledButton}
          className="mt-4 p-2 bg-primary text-dark button"
        >
          {buttonText}
        </Button>
      )}
    </>
  )
}
