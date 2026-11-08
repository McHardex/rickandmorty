import axios from "axios";
import {
  Character,
  CharactersInfo,
  Episode,
  Location,
  ModifiedCharacterDetail,
} from "Interfaces";

interface CharacterDetails {
  info: CharactersInfo;
  characters: ModifiedCharacterDetail[];
}

interface ResourceLink {
  name: string;
  url: string;
}

interface CharacterPageItem extends Omit<Character, "location"> {
  location: ResourceLink;
}

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

const idFromResourceUrl = (url: string | null | undefined): number | null => {
  if (!url) return null;

  const segment = url.split("/").filter(Boolean).pop();
  if (!segment || !/^\d+$/.test(segment)) return null;

  return Number(segment);
};

const collectionUrlFromResourceUrl = (
  url: string | null | undefined
): string | null => {
  const id = idFromResourceUrl(url);
  if (id === null || !url) return null;

  const suffix = `/${id}`;
  if (!url.endsWith(suffix)) return null;

  return url.slice(0, -suffix.length);
};

const firstCollectionUrl = (
  urls: Array<string | null | undefined>
): string | null => {
  for (const url of urls) {
    const collectionUrl = collectionUrlFromResourceUrl(url);
    if (collectionUrl) return collectionUrl;
  }

  return null;
};

const uniqueIds = (urls: Array<string | null | undefined>): number[] => {
  const ids = new Set<number>();

  urls.forEach((url) => {
    const id = idFromResourceUrl(url);
    if (id !== null) ids.add(id);
  });

  return Array.from(ids);
};

const normalizeResourceList = <T>(payload: T | T[]): T[] =>
  Array.isArray(payload) ? payload : [payload];

const fetchResourcesById = async <T extends { id: number }>(
  collectionUrl: string | null,
  ids: number[]
): Promise<Map<number, T>> => {
  if (!collectionUrl || ids.length === 0) return new Map();

  const response = await axios.get<T | T[]>(
    `${collectionUrl}/${ids.join(",")}`
  );
  const resources = normalizeResourceList(response.data);

  return new Map(resources.map((resource) => [resource.id, resource]));
};

const unknownLocation = (name: string, url: string): Location => ({
  id: 0,
  name,
  type: "",
  gender: "",
  dimension: "",
  residents: [],
  url,
  created: "",
});

const locationFromLink = (
  link: ResourceLink | undefined,
  locationsById: Map<number, Location>
): Location => {
  const name = link?.name ?? "";
  const url = link?.url ?? "";
  const id = idFromResourceUrl(url);

  if (id === null) return unknownLocation(name, url);

  return locationsById.get(id) ?? unknownLocation(name, url);
};

const episodesInUrlOrder = (
  episodeUrls: string[] | undefined,
  episodesById: Map<number, Episode>
): Episode[] =>
  (episodeUrls ?? []).flatMap((url) => {
    const id = idFromResourceUrl(url);
    if (id === null) return [];

    const episode = episodesById.get(id);
    return episode ? [episode] : [];
  });

const withFetchedDetails = (
  character: CharacterPageItem,
  locationsById: Map<number, Location>,
  episodesById: Map<number, Episode>
): ModifiedCharacterDetail => {
  const { location, episode, ...details } = character;

  return {
    ...details,
    location: locationFromLink(location, locationsById),
    episode: episodesInUrlOrder(episode, episodesById),
  };
};

const getUpdatedCharacterDetails = async (
  characterUrl: string
): Promise<CharacterDetails> => {
  try {
    const response = await axios.get(characterUrl);
    const characters: CharacterPageItem[] = response.data.results ?? [];
    const locationUrls = characters.map(
      (character) => character.location?.url
    );
    const episodeUrls = characters.flatMap(
      (character) => character.episode ?? []
    );

    const [locationsById, episodesById] = await Promise.all([
      fetchResourcesById<Location>(
        firstCollectionUrl(locationUrls),
        uniqueIds(locationUrls)
      ),
      fetchResourcesById<Episode>(
        firstCollectionUrl(episodeUrls),
        uniqueIds(episodeUrls)
      ),
    ]);

    return {
      info: response.data.info,
      characters: characters.map((character) =>
        withFetchedDetails(character, locationsById, episodesById)
      ),
    };
  } catch (error) {
    throw toError(error);
  }
};

export default getUpdatedCharacterDetails;
