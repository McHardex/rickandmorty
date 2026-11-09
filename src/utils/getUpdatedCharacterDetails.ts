import axios from "axios";
import {
  CharactersInfo,
  Episode,
  Location,
  ModifiedCharacterDetail,
} from "Interfaces";
import fetchResourcesById from "./fetchResourcesById";
import {
  CharacterPageItem,
  withFetchedDetails,
} from "./mapCharacterDetails";
import { firstCollectionUrl, uniqueIds } from "./resourceUrls";

interface CharacterDetails {
  info: CharactersInfo;
  characters: ModifiedCharacterDetail[];
}

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

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
