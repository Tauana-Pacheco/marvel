import { useInfiniteQuery } from "@tanstack/react-query"
import "./MarvelList.css"
import { fetchCharacters } from "../../utils"
import { ICharacter } from "./types"

export function MarvelList() {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["characters"],
      queryFn: fetchCharacters,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { offset, limit, total } = lastPage.data
        const nextOffset = offset + limit
        return nextOffset < total ? nextOffset : undefined
      },
    })
  if (status === "pending") {
    return <div>Carregando, guenta o coração...</div>
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

  return (
    <div>
      <h1>bem vindo a Marvel</h1>
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
      <button
        onClick={() => fetchNextPage()}
        disabled={disabledButton}
        aria-label="Carregar mais personagens"
      >
        {buttonText}
      </button>
    </div>
  )
}
