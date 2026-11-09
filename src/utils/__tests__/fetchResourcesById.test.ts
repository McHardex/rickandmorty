import axios from "axios";
import fetchResourcesById from "utils/fetchResourcesById";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchResourcesById()", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  test("returns an empty map without calling axios when there is nothing to fetch", async () => {
    await expect(fetchResourcesById(null, [1])).resolves.toEqual(new Map());
    await expect(
      fetchResourcesById("https://rickandmortyapi.com/api/episode", [])
    ).resolves.toEqual(new Map());
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  test("normalizes a single resource object into a map keyed by id", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { id: 1, name: "Pilot" },
    });

    const resources = await fetchResourcesById<{ id: number; name: string }>(
      "https://rickandmortyapi.com/api/episode",
      [1]
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/episode/1"
    );
    expect(resources.get(1)).toEqual({ id: 1, name: "Pilot" });
  });
});
