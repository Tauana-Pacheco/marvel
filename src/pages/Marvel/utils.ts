import { URL_BASE, generateAuthParams } from "../../utils"
import { IFetchCharacters } from "./types"

export const fetchCharacters = async ({
  pageParam = 0,
  queryKey,
}: IFetchCharacters) => {
  const [, searchQuery] = queryKey
  const baseUrl = `${URL_BASE}/characters?offset=${pageParam}&limit=20&${generateAuthParams()}`
  const url = searchQuery ? `${baseUrl}&nameStartsWith=${searchQuery}` : baseUrl

  const res = await fetch(url)
  const data = await res.json()
  return data
}
