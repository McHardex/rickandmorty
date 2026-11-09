import {
  collectionUrlFromResourceUrl,
  firstCollectionUrl,
  idFromResourceUrl,
  uniqueIds,
} from "utils/resourceUrls";

describe("resourceUrls", () => {
  test("parses numeric ids and rejects empty or non-numeric segments", () => {
    expect(idFromResourceUrl("https://rickandmortyapi.com/api/location/21")).toBe(
      21
    );
    expect(idFromResourceUrl("")).toBeNull();
    expect(idFromResourceUrl(null)).toBeNull();
    expect(idFromResourceUrl("https://rickandmortyapi.com/api/location/")).toBeNull();
  });

  test("derives collection urls and unique ids from resource links", () => {
    const earth = "https://rickandmortyapi.com/api/location/1";
    const citadel = "https://rickandmortyapi.com/api/location/3";

    expect(collectionUrlFromResourceUrl(earth)).toBe(
      "https://rickandmortyapi.com/api/location"
    );
    expect(firstCollectionUrl(["", earth, citadel])).toBe(
      "https://rickandmortyapi.com/api/location"
    );
    expect(uniqueIds(["", earth, citadel, earth])).toEqual([1, 3]);
  });
});
