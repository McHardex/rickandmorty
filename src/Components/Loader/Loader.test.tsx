import { render, screen } from "@testing-library/react";
import Loader from "./index";

describe("Loader", () => {
  test("renders loader and message", () => {
    render(<Loader isLoading={false} message="loading rick and morty" />);
    const backdrop = screen.getByTestId(/backDrop/i);
    const message = screen.getByText(/loading rick and morty/i);
    const loader = screen.getByTestId(/loader/i);
    expect(message).toBeInTheDocument();
    expect(message.textContent).toEqual("loading rick and morty");
    expect(loader).toBeInTheDocument();
    expect(backdrop).toBeInTheDocument();
  });
});
