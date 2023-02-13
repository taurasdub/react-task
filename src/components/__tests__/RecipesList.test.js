import RecipesList from "../RecipesList";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { render, cleanup, screen } from "@testing-library/react";

afterEach(cleanup);

test("Should return an empty array", () => {
  render(
    <Provider store={store}>
      <RecipesList />
    </Provider>
  );

  const listBefore = localStorage.getItem("recipes");
  expect(listBefore).not.toBe(null);

  localStorage.clear();

  const listAfter = localStorage.getItem("recipes");
  expect(listAfter).toBe(null);
});

test("Should render RecipesList components input fields", () => {
  render(
    <Provider store={store}>
      <RecipesList />
    </Provider>
  );

  expect(screen.getByText("Search by")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("name filter")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("tag filter")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("country filter")).toBeInTheDocument();
});
