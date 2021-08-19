import { useEffect, useState } from "react";
import { CharactersInfo, ModifiedCharacterDetail } from "Interfaces";
import getUpdatedCharacterDetails from "utils/getUpdatedCharacterDetails";
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  Grid,
} from "@material-ui/core";

import LocationDetails from "Components/LocationDetails";
import ChaptersFeatured from "Components/ChaptersFeatured";
import CharacterDetails from "Components/Character";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "90%",
    margin: "0 auto",
  },
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

const App = () => {
  const classes = useStyles();

  const [characters, setCharacters] = useState<ModifiedCharacterDetail[]>([]);
  const [info, setInfo] = useState<CharactersInfo>({
    pages: 0,
    count: 0,
    prev: null,
    next: null,
  });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getCharacterDetails = async (): Promise<void> => {
      const { info, characters } = await getUpdatedCharacterDetails(
        `${process.env.REACT_APP_RICK_AND_MORTY_URL}/character/?page=${page}`
      );

      setInfo(info);
      setCharacters(characters);
    };
    getCharacterDetails();
  }, [page]);

  return (
    <div>
      <Grid container spacing={4} className={classes.gridContainer}>
        {characters.length > 0 &&
          characters.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <Card className={classes.root} key={character.id}>
                <CardMedia
                  className={classes.media}
                  image={character.image}
                  title={character.name}
                />
                <CardContent>
                  <CharacterDetails character={character} />
                  <LocationDetails location={character.location} />
                  <ChaptersFeatured episode={character.episode} />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default App;
