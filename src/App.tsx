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
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import LocationDetails from "Components/LocationDetails";
import ChaptersFeatured from "Components/ChaptersFeatured";
import CharacterDetails from "Components/Character";
import Loader from "Components/Loader";
import AppTopBar from "Components/AppTopBar";
import RMPagination from "Components/RMPagination";

const theme = createTheme({
  typography: {
    fontFamily: ["monospace", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "85%",
    margin: "0 auto",
  },
  cardContent: {
    background: "#3b3e43",
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const getCharacterDetails = async (): Promise<void> => {
      try {
        const { info, characters } = await getUpdatedCharacterDetails(
          `${process.env.REACT_APP_RICK_AND_MORTY_URL}/character/?page=${page}`
        );

        setInfo(info);
        setCharacters(characters);
        setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };
    getCharacterDetails();
  }, [page]);

  const handlePageChange = (event: Object, page: number): void => {
    setPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppTopBar />
        <Loader isLoading={isLoading} message="The Rick And Morty Show" />
        {!isLoading && (
          <RMPagination
            color="secondary"
            count={info.pages}
            hideNextButton={!!info.next}
            hidePrevButton={!!info.prev}
            page={page}
            onChange={handlePageChange}
          />
        )}
        <Grid container spacing={6} className={classes.gridContainer}>
          {characters.length > 0 &&
            characters.map((character) => (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={character.id}>
                <Card key={character.id}>
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
        {!isLoading && (
          <RMPagination
            color="secondary"
            count={info.pages}
            hideNextButton={!!info.next}
            hidePrevButton={!!info.prev}
            page={page}
            onChange={handlePageChange}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
