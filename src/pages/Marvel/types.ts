interface IImage {
  path?: string
  extension?: string
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
