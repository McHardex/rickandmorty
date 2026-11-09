import { Character, Episode, Location, ModifiedCharacterDetail } from "Interfaces";
import { idFromResourceUrl } from "./resourceUrls";

export interface ResourceLink {
  name: string;
  url: string;
}

export interface CharacterPageItem extends Omit<Character, "location"> {
  location: ResourceLink;
}

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

export const locationFromLink = (
  link: ResourceLink | undefined,
  locationsById: Map<number, Location>
): Location => {
  const name = link?.name ?? "";
  const url = link?.url ?? "";
  const id = idFromResourceUrl(url);

  if (id === null) return unknownLocation(name, url);

  return locationsById.get(id) ?? unknownLocation(name, url);
};

export const episodesInUrlOrder = (
  episodeUrls: string[] | undefined,
  episodesById: Map<number, Episode>
): Episode[] =>
  (episodeUrls ?? []).flatMap((url) => {
    const id = idFromResourceUrl(url);
    if (id === null) return [];

    const episode = episodesById.get(id);
    return episode ? [episode] : [];
  });

export const withFetchedDetails = (
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
