import React from "react";
import { render, screen } from "@testing-library/react";
import AppTopBar from "./index";

test("renders correct top nav bar text", () => {
  render(<AppTopBar />);
  const text1 = screen.getByText(/Rick/i);
  const text2 = screen.getByText(/And Mor/i);
  const text3 = screen.getByText(/ty/i);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
  expect(text3).toBeInTheDocument();
});
