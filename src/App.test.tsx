import { render, screen } from "@testing-library/react";
import mockData from "mockData";
import getUpdatedCharacterDetails from "utils/getUpdatedCharacterDetails";
import App from "./App";

jest.mock("utils/getUpdatedCharacterDetails");

const mockedGetUpdatedCharacterDetails =
  getUpdatedCharacterDetails as jest.MockedFunction<
    typeof getUpdatedCharacterDetails
  >;

const pageInfo = (
  next: string | null,
  prev: string | null
) => ({
  count: 42,
  pages: 3,
  next,
  prev,
});

describe("App", () => {
  beforeEach(() => {
    mockedGetUpdatedCharacterDetails.mockReset();
    mockedGetUpdatedCharacterDetails.mockImplementation(
      () => new Promise(() => undefined)
    );
  });

  test("renders app components", async () => {
    render(<App />);
    const loadinMessage = await screen.findByText(/The Rick And Morty Show/i);
    expect(loadinMessage).toBeInTheDocument();
  });

  test("shows next and previous arrows only when those pages exist", async () => {
    mockedGetUpdatedCharacterDetails.mockResolvedValue({
      info: pageInfo("https://example.test/character?page=2", null),
      characters: [mockData.character],
    });

    render(<App />);

    expect(await screen.findByText("Abradolf Lincler")).toBeInTheDocument();
    expect(screen.getAllByLabelText("Go to next page")).toHaveLength(2);
    expect(screen.queryByLabelText("Go to previous page")).not.toBeInTheDocument();
  });

  test("shows both arrows when the current page has neighbors", async () => {
    mockedGetUpdatedCharacterDetails.mockResolvedValue({
      info: pageInfo(
        "https://example.test/character?page=3",
        "https://example.test/character?page=1"
      ),
      characters: [mockData.character],
    });

    render(<App />);

    expect(await screen.findAllByLabelText("Go to next page")).toHaveLength(2);
    expect(screen.getAllByLabelText("Go to previous page")).toHaveLength(2);
  });

  test("stops the loader and keeps pagination when the page fails", async () => {
    mockedGetUpdatedCharacterDetails.mockRejectedValue(new Error("down"));

    render(<App />);

    expect(await screen.findByText("Unable to load characters.")).toBeInTheDocument();
    expect(screen.getByTestId("backDrop")).not.toHaveClass("MuiBackdrop-open");
    expect(screen.getAllByLabelText("pagination navigation")).toHaveLength(2);
    expect(screen.queryByText("Abradolf Lincler")).not.toBeInTheDocument();
  });
});
