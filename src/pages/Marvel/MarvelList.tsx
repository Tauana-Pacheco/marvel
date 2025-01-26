import { useState, ChangeEvent, FormEvent } from "react"
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
import { IoClose } from "react-icons/io5"

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
  const disabledButton = !hasNextPage || isFetchingNextPage || !dict.noLoading

  return (
    <div>
      <h1 className="text-2xl  mb-4 ">{dict.welcome}</h1>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-4 flex items-center border-b border-gray-400"
      >
        <Input
          ariaLabel="input"
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder={dict.searchHero}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-2 py-1 px-2 leading-tight focus:outline-none"
        />
        <Button
          ariaLabel="busca"
          label={<FaSearch size={20} />}
          type="submit"
          className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        {cleanSearch && (
          <Button
            ariaLabel="limpar pesquisa"
            label={<IoClose size={30} />}
            onClick={handleClearSearch}
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          />
        )}
      </form>
      {isSearchEmpty && (
        <p data-testid="character-not-found" className="text-error">
          {dict.characterNotFound}
        </p>
      )}

      {data.pages.map((page, i) => (
        <Card key={i} id="card">
          {page?.data.results?.map((character: ICharacter) => (
            <div key={character.id} className="cursor-pointer mb-10">
              <p className="font-bold text-lg font-mono">{character.name}</p>
              {character.thumbnail && (
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="w-full rounded-lg"
                />
              )}
              <Accordion title="Descrição">
                <p>{character.description || dict.noDescription}</p>
              </Accordion>
              <Accordion title="Participações em Quadrinhos">
                {(character.comics?.items || []).map((item, index) => (
                  <p key={index}>{item.name}</p>
                )) || <p>{dict.noDescription}</p>}
              </Accordion>

              <Accordion title="Participações em Filmes:">
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
          ariaLabel="carrega personagens"
          onClick={fetchNextPage}
          disabled={disabledButton}
          label={buttonText}
          className="mt-4 p-2 bg-dark text-slate-50 rounded cursor-pointer"
        />
      )}
    </div>
  )
}
