import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NewRecipe from "../NewRecipe";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

test("Should add a recipe to the list", () => {
  const setList = jest.fn();
  const list = [
    { id: 1, name: "Recipe 1" },
    { id: 2, name: "Recipe 2" },
  ];
  render(
    <Provider store={store}>
      <NewRecipe setList={setList} list={list} />
    </Provider>
  );

  const addRecipeButton = screen.getByText("Add Recipe");
  fireEvent.click(addRecipeButton);

  const nameInput = screen.getByPlaceholderText("Name");
  const tagsInput = screen.getByPlaceholderText("Tags (separated by comma)");
  const countryInput = screen.getByPlaceholderText("Country");
  const ingredientsInput = screen.getByPlaceholderText("Ingredients");
  const instructionsInput = screen.getByPlaceholderText(
    "Preparation instruction"
  );
  const imageInput = screen.getByPlaceholderText("Image url");
  const videoInput = screen.getByPlaceholderText("Video url");

  fireEvent.change(nameInput, { target: { value: "Recipe 3" } });
  fireEvent.change(tagsInput, { target: { value: "tag1, tag2" } });
  fireEvent.change(countryInput, { target: { value: "Country 3" } });
  fireEvent.change(ingredientsInput, {
    target: { value: "ingredient1, ingredient2" },
  });
  fireEvent.change(instructionsInput, {
    target: { value: "instruction1, instruction2" },
  });
  fireEvent.change(imageInput, {
    target: {
      value: "Image URL 3",
    },
  });
  fireEvent.change(videoInput, {
    target: { value: "Video URL 3" },
  });

  const addRecipeToListButton = screen.getByText("Add");
  fireEvent.click(addRecipeToListButton);

  expect(setList).toHaveBeenCalledWith([
    { id: 1, name: "Recipe 1" },
    { id: 2, name: "Recipe 2" },
    {
      id: 3,
      name: "Recipe 3",
      tags: ["tag1", " tag2"],
      country: "Country 3",
      ingredientsList: ["ingredient1", " ingredient2"],
      preparationInstructions: ["instruction1", " instruction2"],
      imageUrl: "Image URL 3",
      videoUrl: "Video URL 3",
    },
  ]);
});
