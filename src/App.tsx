import { useEffect, useState } from "react";
import { Character, CharactersInfo } from "Interfaces";
import getUpdatedCharacterDetails from "utils/getUpdatedCharacterDetails";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<CharactersInfo>({
    pages: 0,
    count: 0,
    prev: null,
    next: null,
  });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getCharacterDetails = async () => {
      const { info, characters } = await getUpdatedCharacterDetails(
        `${process.env.REACT_APP_RICK_AND_MORTY_URL}/character/?page=${page}`
      );

      setInfo(info);
      setCharacters(characters);
    };
    getCharacterDetails();
  }, [page]);

  return (
    <div className="App">
      <button disabled={info.prev === null} onClick={() => setPage(page - 1)}>
        Prev Page
      </button>
      <button disabled={info.next === null} onClick={() => setPage(page + 1)}>
        Next Page
      </button>
      {characters.length > 0 && (
        <>
          <div></div>
          <h1>Page: {page}</h1>
          <pre>{JSON.stringify(info, null, 4)}</pre>
          <pre>{JSON.stringify(characters, null, 4)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
