import axios from "axios";
import { Character, CharactersInfo, ModifiedCharacterDetail } from "Interfaces";
import getEpisode from "./getEpisode";
import getLocation from "./getLocation";

interface CharacterDetails {
  info: CharactersInfo;
  characters: ModifiedCharacterDetail[];
}

const getUpdatedCharacterDetails = async (
  characterUrl: string
): Promise<CharacterDetails> => {
  try {
    const res = await axios.get(characterUrl);
    const characters = res.data.results;

    const charactersWithLocationAndEpisodeDetails: ModifiedCharacterDetail[] =
      characters.map(async (character: Character) => {
        // get location details
        const locationDetails = await getLocation(character.location.url);

        // get episode details
        const episodesPromises = character.episode.map(
          async (episode) => await getEpisode(episode)
        );

        const episodeDetails = await Promise.all([...episodesPromises]);

        // update charaters
        return {
          ...character,
          location: locationDetails,
          episode: episodeDetails,
        };
      });

    const result = await Promise.all(charactersWithLocationAndEpisodeDetails);

    return {
      info: res.data.info,
      characters: result,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export default getUpdatedCharacterDetails;
