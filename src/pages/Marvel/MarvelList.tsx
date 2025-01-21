import { useState, ChangeEvent, FormEvent } from "react"
import { useSearchParams } from "react-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import "./MarvelList.css"
import { fetchCharacters } from "../../utils"
import { ICharacter } from "./types"
import Button from "../../components/Button"
import Input from "../../components/Input"

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
    return <div>Pera, os herois já estão chegando</div>
  }

  if (status === "error") {
    return <div>Ihh deu ruim :/</div>
  }

  const disabledButton = !hasNextPage || isFetchingNextPage

  let buttonText
  if (isFetchingNextPage) {
    buttonText = "Carregando mais..."
  } else if (hasNextPage) {
    buttonText = "Carregar mais"
  } else {
    buttonText = "Nada mais para carregar"
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
  return (
    <div>
      <header>Marvel</header>
      <h1>bem vindo a Marvel</h1>
      <form onSubmit={handleSearchSubmit}>
        <Input
          ariaLabel="input"
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder="Pesquise seu heroi"
        />
        <Button ariaLabel="busca" type="submit" label="Buscar" />
        <Button
          ariaLabel="limpar pesquisa"
          onClick={handleClearSearch}
          label="Limpar pesquisa"
        />
      </form>

      <ul>
        {data.pages.map((page, i) => (
          <div key={i}>
            {page.data.results?.map((character: ICharacter) => (
              <li key={character.id}>
                <h2>Nome</h2>
                <p>{character.name}</p>

                <h2>Imagem</h2>
                {character.thumbnail && (
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                )}

                <h2>Descrição</h2>
                <p>
                  {character.description || "Nenhuma descrição disponíveln:/"}
                </p>

                <h2>Número de Participações em Séries</h2>
                <p>
                  {character.series?.available ||
                    "Nenhum número foi encontrado "}
                </p>

                <h2>Número de Participações em Quadrinhos</h2>
                <p>
                  {character.stories?.available ||
                    "Nenhum número foi encontrado "}
                </p>
              </li>
            ))}
          </div>
        ))}
      </ul>

      <Button
        ariaLabel="carrega personagens"
        onClick={fetchNextPage}
        disabled={disabledButton}
        label={buttonText}
      />
    </div>
  )
}
