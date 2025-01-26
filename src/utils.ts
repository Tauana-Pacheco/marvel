import md5 from "crypto-js/md5"

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY
export const URL_BASE = "https://gateway.marvel.com/v1/public"

export const generateAuthParams = () => {
  const timestamp = new Date().getTime()
  const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).toString()
  return `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`
}
