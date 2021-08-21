import axios, { AxiosResponse } from "axios";
import mockData from "mockData";
import getLocation from "utils/getLocation";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getLocation()", () => {
  test("should return location details", async () => {
    const mockedResponse: AxiosResponse = {
      data: mockData.location,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).not.toHaveBeenCalled();
    const data = await getLocation("/location");
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(mockData.location);
  });
});
