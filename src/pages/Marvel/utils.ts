/* eslint-disable semi */
import { ACCESS_TOKEN, URL_BASE } from "../../utils";
import { IFetchCharacters, ISuperheroApiCharacter } from "./types";

const PAGE_SIZE = 20;
const MAX_CHARACTER_ID = 731;

const toItems = (value?: string) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((name) => ({ name }));

const mapCharacter = (character: ISuperheroApiCharacter) => {
  const [path, extension] = (character.image?.url || "").split(/\.(?=[^.]+$)/);
  return {
    id: Number(character.id),
    name: character.name,
    description:
      character.biography?.["full-name"] ||
      character.work?.occupation ||
      undefined,
    thumbnail:
      path && extension
        ? { path, extension }
        : { url: character.image?.url || "" },
    comics: { items: (character.biography?.aliases || []).map((name) => ({ name })) },
    series: { items: toItems(character.connections?.["group-affiliation"]) },
  };
};

const fetchCharacterById = async (id: number) => {
  const res = await fetch(`${URL_BASE}/${ACCESS_TOKEN}/${id}`);
  const data = await res.json();
  return data;
};

export const fetchCharacters = async ({
  pageParam = 0,
  queryKey,
}: IFetchCharacters) => {
  const [, searchQuery] = queryKey;
  if (searchQuery) {
    const res = await fetch(`${URL_BASE}/${ACCESS_TOKEN}/search/${searchQuery}`);
    const data = await res.json();
    const results =
      data?.response === "success"
        ? (data.results || []).map(mapCharacter)
        : [];

    return {
      data: {
        offset: 0,
        limit: PAGE_SIZE,
        total: results.length,
        results,
      },
    };
  }

  const startId = Number(pageParam) + 1;
  const endId = Math.min(startId + PAGE_SIZE - 1, MAX_CHARACTER_ID);
  const requests = Array.from({ length: endId - startId + 1 }, (_, i) =>
    fetchCharacterById(startId + i)
  );
  const responses = await Promise.all(requests);
  const results = responses
    .filter((item) => item?.response === "success")
    .map((item) => mapCharacter(item));

  return {
    data: {
      offset: pageParam,
      limit: PAGE_SIZE,
      total: MAX_CHARACTER_ID,
      results,
    },
  };
};
