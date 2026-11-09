import {
  episodesInUrlOrder,
  locationFromLink,
  withFetchedDetails,
} from "utils/mapCharacterDetails";

const earth = {
  id: 1,
  name: "Earth",
  type: "Planet",
  gender: "",
  dimension: "C-137",
  residents: [],
  url: "https://rickandmortyapi.com/api/location/1",
  created: "2017-11-10T12:42:04.162Z",
};

const pilot = {
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
  characters: [],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z",
};

describe("mapCharacterDetails", () => {
  test("builds an unknown location when the link has no fetchable id", () => {
    expect(locationFromLink({ name: "unknown", url: "" }, new Map())).toEqual({
      id: 0,
      name: "unknown",
      type: "",
      gender: "",
      dimension: "",
      residents: [],
      url: "",
      created: "",
    });
  });

  test("keeps episode order from the character urls", () => {
    const ordered = episodesInUrlOrder(
      [
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/1",
        "",
      ],
      new Map([
        [1, pilot],
        [
          10,
          {
            ...pilot,
            id: 10,
            name: "Close Rick-counters of the Rick Kind",
            url: "https://rickandmortyapi.com/api/episode/10",
          },
        ],
      ])
    );

    expect(ordered.map((episode) => episode.id)).toEqual([10, 1]);
  });

  test("maps a page item into ModifiedCharacterDetail", () => {
    const mapped = withFetchedDetails(
      {
        id: 7,
        name: "Abradolf Lincler",
        status: "unknown",
        species: "Human",
        type: "Genetic experiment",
        gender: "Male",
        origin: { name: "Earth", url: "" },
        location: { name: "Earth", url: earth.url },
        image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
        episode: [pilot.url],
        url: "https://rickandmortyapi.com/api/character/7",
        created: "2017-11-04T19:59:20.523Z",
      },
      new Map([[1, earth]]),
      new Map([[1, pilot]])
    );

    expect(mapped.location).toEqual(earth);
    expect(mapped.episode).toEqual([pilot]);
  });
});
