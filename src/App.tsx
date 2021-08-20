import { useEffect, useState } from "react";
import { CharactersInfo, ModifiedCharacterDetail } from "Interfaces";
import getUpdatedCharacterDetails from "utils/getUpdatedCharacterDetails";
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  Grid,
  Box,
} from "@material-ui/core";

import LocationDetails from "Components/LocationDetails";
import ChaptersFeatured from "Components/ChaptersFeatured";
import CharacterDetails from "Components/Character";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "80%",
    margin: "0 auto",
  },
  cardContent: {
    background: "#3b3e43",
  },
  root: {
    width: 300,
    margin: "0 auto",
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
      <Grid container spacing={6} className={classes.gridContainer}>
        {characters.length > 0 &&
          characters.map((character) => (
            <Grid item xs key={character.id}>
              <Card className={classes.root} key={character.id}>
                <CardMedia
                  className={classes.media}
                  image={character.image}
                  title={character.name}
                />
                <CardContent className={classes.cardContent}>
                  <CharacterDetails character={character} />
                  <LocationDetails location={character.location} />
                  <Box mt={1}>
                    <ChaptersFeatured episode={character.episode} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default App;
