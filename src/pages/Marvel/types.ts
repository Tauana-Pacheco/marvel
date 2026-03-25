interface IImage {
  path?: string
  extension?: string
  url?: string
}
interface IItemsName {
  name: string
}
interface IItems {
  items: IItemsName[]
}
export interface ICharacter {
  id: number
  name?: string
  description?: string
  thumbnail?: IImage
  comics?: IItems
  series?: IItems
}

export interface ICharacterDataContainer {
  offset?: number
  limit?: number
  total?: number
  cout: number
  results?: ICharacter[]
}

export interface ICharacterDataWrapper {
  data?: ICharacterDataContainer
}

export interface IFetchCharacters {
  pageParam?: number
  queryKey: string[]
}

export interface ISuperheroApiCharacter {
  id: string
  name?: string
  biography?: {
    "full-name"?: string
    aliases?: string[]
  }
  work?: {
    occupation?: string
  }
  connections?: {
    "group-affiliation"?: string
    relatives?: string
  }
  image?: {
    url?: string
  }
}
