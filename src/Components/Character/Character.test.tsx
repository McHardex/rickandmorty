import { render, screen } from "@testing-library/react";
import mockData from "mockData";
import Character from "./index";

describe("Character", () => {
  test("renders character details", () => {
    render(<Character character={mockData.character} />);
    const header = screen.getByText(/^Abradolf Lincler$/i); // full string match, ignore case
    const createdDate = screen.getByText(/^2017-11-4$/i);
    const status = screen.getByText(/^unknown$/i);
    const species = screen.getByText(/^Human$/i);
    const origin = screen.getByText(/Earth/i); // substring match, ignore case
    const gender = screen.getByText(/^Male$/i);
    expect(header).toBeInTheDocument();
    expect(createdDate).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(species).toBeInTheDocument();
    expect(origin).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
  });
});
