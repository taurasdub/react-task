import { render, fireEvent, screen } from "@testing-library/react";
import RandomRecipe from "../RandomRecipe";

test("Should return RandomRecipe components button", () => {
  render(<RandomRecipe />);
  const button = screen.getByText("Add Random Recipe");
  expect(button).toBeInTheDocument();
});
