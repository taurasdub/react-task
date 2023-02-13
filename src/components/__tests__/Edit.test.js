import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Edit from "../Edit";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

test("Should edit the name of the recipe", () => {
  const list = [
    {
      id: 1,
      name: "Original Recipe Name",
      country: "Lithuania",
      tags: ["tag1", "tag2"],
      preparationInstructions: "Instructions",
      ingredientsList: ["ingredient1", "ingredient2"],
      imageUrl: "Image URL",
      videoUrl: "Video URL",
    },
  ];
  const setList = jest.fn();
  const setEdit = jest.fn();

  render(
    <Provider store={store}>
      <Edit item={list[0]} list={list} setList={setList} setEdit={setEdit} />
    </Provider>
  );
  const nameInput = screen.getByLabelText("Name");

  fireEvent.change(nameInput, { target: { value: "Updated Recipe Name" } });
  fireEvent.submit(nameInput);

  expect(setList).toHaveBeenCalledWith([
    {
      id: 1,
      name: "Updated Recipe Name",
      country: "Lithuania",
      tags: ["tag1", "tag2"],
      preparationInstructions: "Instructions",
      ingredientsList: ["ingredient1", "ingredient2"],
      imageUrl: "Image URL",
      videoUrl: "Video URL",
    },
  ]);
});
