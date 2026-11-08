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
  Typography,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { PaginationProps } from "@material-ui/lab/Pagination";

import LocationDetails from "Components/LocationDetails";
import ChaptersFeatured from "Components/ChaptersFeatured";
import CharacterDetails from "Components/Character";
import Loader from "Components/Loader";
import AppTopBar from "Components/AppTopBar";
import RMPagination from "Components/RMPagination";

const theme = createTheme({
  typography: {
    fontFamily: ["roboto", "monospace"].join(","),
    fontSize: 16,
  },
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "95%",
    margin: "0 auto",
  },
  cardContent: {
    background: "#3b3e43",
  },
  media: {
    width: "300px",
    height: "300px",
    margin: "0 auto",
  },
}));

const CHARACTER_LOAD_ERROR = "Unable to load characters.";

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
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setLoadError(null);

    const getCharacterDetails = async (): Promise<void> => {
      try {
        const { info, characters } = await getUpdatedCharacterDetails(
          `${process.env.REACT_APP_RICK_AND_MORTY_URL}/character/?page=${page}`
        );

        if (!isCurrentRequest) return;

        setInfo(info);
        setCharacters(characters);
        setIsLoading(false);
      } catch {
        if (!isCurrentRequest) return;

        setCharacters([]);
        setLoadError(CHARACTER_LOAD_ERROR);
        setIsLoading(false);
      }
    };

    getCharacterDetails();

    return () => {
      isCurrentRequest = false;
    };
  }, [page]);

  const handlePageChange = (event: Object, page: number): void => {
    setPage(page);
  };

  const paginationProps: PaginationProps = {
    color: "secondary",
    count: info.pages,
    hideNextButton: !info.next,
    hidePrevButton: !info.prev,
    page,
    onChange: handlePageChange,
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppTopBar />
        <Loader isLoading={isLoading} message="The Rick And Morty Show" />
        {!isLoading && <RMPagination {...paginationProps} />}
        {loadError && !isLoading && (
          <Box mt={4} textAlign="center">
            <Typography color="error">{loadError}</Typography>
          </Box>
        )}
        <Grid container spacing={6} className={classes.gridContainer}>
          {characters.length > 0 &&
            characters.map((character) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={character.id}>
                <Card key={character.id}>
                  <Box bgcolor="#3b3e43" padding="20px 20px 0 20px">
                    <CardMedia
                      className={classes.media}
                      image={character.image}
                      title={character.name}
                    />
                  </Box>
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
        {!isLoading && <RMPagination {...paginationProps} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
