interface IImage {
  path?: string
  extension?: string
}

interface INumberOfApperces {
  available?: number
}

export interface ICharacter {
  id?: number
  name?: string
  description?: string
  thumbnail?: IImage
  series?: INumberOfApperces
  stories?: INumberOfApperces
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
