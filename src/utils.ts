import md5 from "crypto-js/md5"

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY
const URL_BASE = "https://gateway.marvel.com/v1/public"

const generateAuthParams = () => {
  const timestamp = new Date().getTime()
  const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).toString()
  return `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`
}

interface IFetchCharacters {
  pageParam: number
  queryKey: string[]
}

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
