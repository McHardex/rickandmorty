import { fireEvent, render, screen } from "@testing-library/react";
import LocationDetails from "./index";
import mockData from "mockData";

describe("Character Featured", () => {
  test("renders the correct character featured title", () => {
    render(<LocationDetails location={mockData.location} />);
    const title = screen.getByText(/Location Details/i);
    expect(title).toBeInTheDocument();
  });

  test("should toggle collapsible", async () => {
    render(<LocationDetails location={mockData.location} />);

    let collapsible = screen.queryByTestId("collapse");
    expect(collapsible).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/show more/));
    collapsible = screen.getByTestId("collapse");
    expect(collapsible).toBeInTheDocument();
  });
});
