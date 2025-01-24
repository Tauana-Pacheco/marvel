interface IImage {
  path?: string
  extension?: string
}

export interface IComics {
  description?: string
  id: number
  thumbnail?: IImage
  characters?: ICharacter[]
  title: string
}

export interface ICharacter {
  id: number
  name?: string
  description?: string
  thumbnail?: IImage
  comics: {
    items: {
      name: string
    }
  }
  series?: IComics
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
