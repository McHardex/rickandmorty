import axios, { AxiosResponse } from "axios";
import mockData from "mockData";
import getEpisode from "utils/getEpisode";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getEpisode()", () => {
  test("should return episodes", async () => {
    const mockedResponse: AxiosResponse = {
      data: mockData.episode,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).not.toHaveBeenCalled();
    const data = await getEpisode("/episode");
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(mockData.episode);
  });
});
