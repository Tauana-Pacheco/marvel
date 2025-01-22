export const listOfCharactersMock = {
  data: {
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
          path: "path/to/aim",
          extension: "jpg",
        },
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
          path: "path/to/absorbingman",
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
  },
}

export const characterSearchMock = {
  data: {
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
          path: "path/to/3-dman",
          extension: "jpg",
        },
        series: {
          available: 3,
        },
        stories: {
          available: 21,
        },
      },
    ],
  },
}

export const emptyDataMock = {
  data: {
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: [],
  },
}
