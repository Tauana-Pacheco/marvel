export const listOfCharactersMock = {
  data: {
    results: [
      {
        id: 1,
        name: "Spider-Man",
        description: "Friendly neighborhood Spider-Man.",
        thumbnail: { path: "spider-man-image", extension: "jpg" },
        comics: { items: [{ name: "Amazing Fantasy #15" }] },
        series: { items: [{ name: "Spider-Man Series" }] },
      },
      {
        id: 2,
        name: "Iron Man",
        description: "Genius, billionaire, playboy, philanthropist.",
        thumbnail: { path: "iron-man-image", extension: "png" },
        comics: { items: [{ name: "Iron Man #1" }] },
        series: { items: [{ name: "Iron Man Series" }] },
      },
    ],
    offset: 0,
    limit: 2,
    total: 2,
  },
}
