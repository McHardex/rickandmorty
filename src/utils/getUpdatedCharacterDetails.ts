import axios from "axios";
import { Character, CharactersInfo } from "Interfaces";
import getEpisode from "./getEpisode";
import getLocation from "./getLocation";

interface CharacterDetails {
  info: CharactersInfo;
  characters: Character[];
}

const getUpdatedCharacterDetails = async (
  characterUrl: string
): Promise<CharacterDetails> => {
  const res = await axios.get(characterUrl);
  const characters = res.data.results;

  const charactersWithLocationAndEpisodeDetails: Character[] = characters.map(
    async (character: Character) => {
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
    }
  );

  const result = await Promise.all(charactersWithLocationAndEpisodeDetails);

  return {
    info: res.data.info,
    characters: result,
  };
};

export default getUpdatedCharacterDetails;
