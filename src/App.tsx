import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Characters, Location, Episode, CharactersInfo } from "Interfaces";

const url = "https://rickandmortyapi.com/api/character";

const App = () => {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [info, setInfo] = useState<CharactersInfo>({
    pages: 0,
    count: 0,
    prev: null,
    next: null,
  });
  const [page, setPage] = useState<number>(1);

  const getLocation = async (locationUrl: string): Promise<Location[]> => {
    const res = await axios.get(locationUrl);
    return res.data;
  };

  const getChapters = async (episodeUrl: string): Promise<Episode[]> => {
    const res = await axios.get(episodeUrl);
    return res.data;
  };

  const getCharactersLocationAndEpisodes =
    useCallback(async (): Promise<void> => {
      const res = await axios.get(`${url}/?page=${page}`);
      const characters = res.data.results;

      const charactersWithLocationAndEpisodeDetails: Characters[] =
        characters.map(async (character: Characters) => {
          // get location details
          const locationDetails = await getLocation(character.location.url);

          // get episode details
          const episodesPromises = character.episode.map(
            async (episode) => await getChapters(episode)
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

      setInfo(res.data.info);
      setCharacters(result);
    }, [page]);

  useEffect(() => {
    getCharactersLocationAndEpisodes();
  }, [page, getCharactersLocationAndEpisodes]);

  return (
    <div className="App">
      {characters.length > 0 && (
        <>
          <div>
            <button
              disabled={info.prev === null}
              onClick={() => setPage(page - 1)}
            >
              Prev Page
            </button>
            <button
              disabled={info.next === null}
              onClick={() => setPage(page + 1)}
            >
              Next Page
            </button>
          </div>
          <h1>Page: {page}</h1>
          <pre>{JSON.stringify(info, null, 4)}</pre>
          <pre>{JSON.stringify(characters, null, 4)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
