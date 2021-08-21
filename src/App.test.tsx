import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app components", () => {
  render(<App />);
  const loadinMessage = screen.getByText(/The Rick And Morty Show/i);
  expect(loadinMessage).toBeInTheDocument();
});
