import axios from "axios";
import getUpdatedCharacterDetails from "utils/getUpdatedCharacterDetails";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const characterPageUrl = "https://rickandmortyapi.com/api/character/?page=1";

const pageInfo = {
  count: 2,
  pages: 2,
  next: "https://rickandmortyapi.com/api/character/?page=2",
  prev: null,
};

const earth = {
  id: 1,
  name: "Earth",
  type: "Planet",
  dimension: "Dimension C-137",
  residents: ["https://rickandmortyapi.com/api/character/1"],
  url: "https://rickandmortyapi.com/api/location/1",
  created: "2017-11-10T12:42:04.162Z",
  gender: "",
};

const citadel = {
  id: 3,
  name: "Citadel of Ricks",
  type: "Space station",
  dimension: "unknown",
  residents: [],
  url: "https://rickandmortyapi.com/api/location/3",
  created: "2017-11-10T13:08:13.191Z",
  gender: "",
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

const lawnmower = {
  id: 2,
  name: "Lawnmower Dog",
  air_date: "December 9, 2013",
  episode: "S01E02",
  characters: [],
  url: "https://rickandmortyapi.com/api/episode/2",
  created: "2017-11-10T12:56:33.916Z",
};

const closeEncounters = {
  id: 10,
  name: "Close Rick-counters of the Rick Kind",
  air_date: "April 7, 2014",
  episode: "S01E10",
  characters: [],
  url: "https://rickandmortyapi.com/api/episode/10",
  created: "2017-11-10T12:56:34.747Z",
};

const character = (
  id: number,
  location: { name: string; url: string },
  episode: string[]
) => ({
  id,
  name: `Character ${id}`,
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location,
  image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
  episode,
  url: `https://rickandmortyapi.com/api/character/${id}`,
  created: "2017-11-04T18:48:46.250Z",
});

const requestedUrls = () =>
  mockedAxios.get.mock.calls.map((call) => String(call[0]));

describe("getUpdatedCharacterDetails()", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  test("batches shared location and episode ids and keeps episode order", async () => {
    const results = [
      character(
        1,
        { name: "Earth", url: earth.url },
        [closeEncounters.url, pilot.url]
      ),
      character(
        2,
        { name: "Citadel of Ricks", url: citadel.url },
        [pilot.url, lawnmower.url]
      ),
    ];

    mockedAxios.get.mockImplementation((url: string) => {
      if (url === characterPageUrl) {
        return Promise.resolve({ data: { info: pageInfo, results } });
      }

      if (url === "https://rickandmortyapi.com/api/location/1,3") {
        return Promise.resolve({ data: [earth, citadel] });
      }

      if (url === "https://rickandmortyapi.com/api/episode/10,1,2") {
        return Promise.resolve({
          data: [pilot, lawnmower, closeEncounters],
        });
      }

      return Promise.reject(new Error(`unexpected ${url}`));
    });

    const data = await getUpdatedCharacterDetails(characterPageUrl);

    expect(requestedUrls()).toEqual([
      characterPageUrl,
      "https://rickandmortyapi.com/api/location/1,3",
      "https://rickandmortyapi.com/api/episode/10,1,2",
    ]);
    expect(data.info).toEqual(pageInfo);
    expect(data.characters[0].location).toEqual(earth);
    expect(data.characters[0].episode.map((episode) => episode.id)).toEqual([
      10, 1,
    ]);
    expect(data.characters[1].location.name).toEqual("Citadel of Ricks");
    expect(data.characters[1].episode.map((episode) => episode.name)).toEqual([
      "Pilot",
      "Lawnmower Dog",
    ]);
  });

  test("accepts a single resource object and skips empty location urls", async () => {
    const results = [
      character(1, { name: "unknown", url: "" }, [pilot.url, ""]),
    ];

    mockedAxios.get.mockImplementation((url: string) => {
      if (url === characterPageUrl) {
        return Promise.resolve({ data: { info: pageInfo, results } });
      }

      if (url === "https://rickandmortyapi.com/api/episode/1") {
        return Promise.resolve({ data: pilot });
      }

      return Promise.reject(new Error(`unexpected ${url}`));
    });

    const data = await getUpdatedCharacterDetails(characterPageUrl);

    expect(requestedUrls()).toEqual([
      characterPageUrl,
      "https://rickandmortyapi.com/api/episode/1",
    ]);
    expect(data.characters[0].location).toMatchObject({
      name: "unknown",
      type: "",
      dimension: "",
      residents: [],
      url: "",
    });
    expect(data.characters[0].episode).toEqual([pilot]);
  });

  test("rejects character and detail failures as Error instances", async () => {
    const failure = new Error("location failed");
    const results = [character(1, { name: "Earth", url: earth.url }, [])];

    mockedAxios.get.mockRejectedValueOnce("down");
    await expect(getUpdatedCharacterDetails(characterPageUrl)).rejects.toThrow(
      "down"
    );

    mockedAxios.get.mockReset();
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === characterPageUrl) {
        return Promise.resolve({ data: { info: pageInfo, results } });
      }

      return Promise.reject(failure);
    });

    await expect(getUpdatedCharacterDetails(characterPageUrl)).rejects.toBe(
      failure
    );
  });
});
