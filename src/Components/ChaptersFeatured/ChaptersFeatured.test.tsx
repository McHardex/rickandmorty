import { fireEvent, render, screen } from "@testing-library/react";
import mockData from "mockData";
import ChaptersFeatured from "./index";

const props = {
  episode: mockData.episode,
};

describe("Character Featured", () => {
  test("renders the correct character featured title", () => {
    render(<ChaptersFeatured {...props} />);
    const title = screen.getByText(/Chapters Featured/i);
    expect(title).toBeInTheDocument();
  });

  test("ensures badge value is equal to the count of episodes", () => {
    render(<ChaptersFeatured {...props} />);
    const episodeCount = screen.getByTestId("badge").textContent;
    expect(Number(episodeCount)).toEqual(props.episode.length);
  });

  test("toggles collapsible", async () => {
    render(<ChaptersFeatured {...props} />);
    let episode = screen.queryByText(/Pilot/);
    expect(episode).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/show more/));
    episode = await screen.findByText(/Pilot/);
    expect(episode).toBeInTheDocument();
    expect(episode.textContent).toEqual("Pilot");
  });
});
