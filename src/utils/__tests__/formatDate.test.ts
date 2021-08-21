import formatDate from "utils/formatDate";

describe("formatDate()", () => {
  test("returns readable date format", () => {
    expect(formatDate("2017-11-04T18:48:46.250Z")).toEqual("2017-11-4");
  });
});
