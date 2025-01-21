const listOfCharacters = {
  offset: 0,
  limit: 2,
  total: 2,
  count: 1,
  results: [
    {
      id: 1009144,
      name: "A.I.M.",
      description:
        "AIM is a terrorist organization bent on destroying the world.",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec",
        extension: "jpg",
      },
      resourceURI: "http://gateway.marvel.com/v1/public/characters/1009144",
      series: {
        available: 36,
      },
      stories: {
        available: 57,
      },
    },
    {
      id: 1009148,
      name: "Absorbing Man",
      description: "",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/1/b0/5269678709fb7",
        extension: "jpg",
      },
      series: {
        available: 53,
      },
      stories: {
        available: 117,
      },
    },
  ],
}

const characterSearch = {
  offset: 0,
  limit: 20,
  total: 1,
  count: 1,
  results: [
    {
      id: 1011334,
      name: "3-D Man",
      description: "",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
      series: {
        available: 3,
      },
      stories: {
        available: 21,
      },
    },
  ],
}

export { listOfCharacters, characterSearch }
