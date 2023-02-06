import React, { useState } from "react";

export default function NewRecipe({ setList, list }) {
  const [addRecipe, setAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    id: null,
    name: "",
    tags: [],
    country: "",
    preparationInstructions: [],
    ingredientsList: [],
    imageUrl: "",
    videoUrl: "",
  });

  function handleNewRecipeInput(e) {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]:
        e.target.name === "tags" ||
        e.target.name === "preparationInstructions" ||
        e.target.name === "ingredientsList"
          ? e.target.value.split(",").map((list) => list)
          : e.target.value,
    });
  }

  function handleSubmitNewRecipe() {
    setList([...list, { ...newRecipe, id: list.length + 1 }]);
    setAddRecipe(false);
  }

  function handleAddRecipe() {
    setAddRecipe(!addRecipe);
  }

  return (
    <React.Fragment>
      <button onClick={handleAddRecipe}>Add Recipe</button>
      {addRecipe && (
        <div>
          <input
            type="text"
            name="name"
            onChange={handleNewRecipeInput}
            value={newRecipe.name}
            placeholder="Name"
          />
          <input
            type="text"
            name="tags"
            onChange={handleNewRecipeInput}
            value={newRecipe.tags}
            placeholder="Tags (separated by comma)"
          />
          <input
            type="text"
            name="country"
            onChange={handleNewRecipeInput}
            value={newRecipe.country}
            placeholder="Country"
          />
          <input
            type="text"
            name="ingredientsList"
            onChange={handleNewRecipeInput}
            value={newRecipe.ingredientsList}
            placeholder="Ingredients"
          />
          <input
            type="text"
            name="preparationInstructions"
            onChange={handleNewRecipeInput}
            value={newRecipe.preparationInstructions}
            placeholder="Preparation instruction"
          />
          <input
            type="text"
            name="imageUrl"
            onChange={handleNewRecipeInput}
            value={newRecipe.imageUrl}
            placeholder="Image url"
          />
          <input
            type="text"
            name="videoUrl"
            onChange={handleNewRecipeInput}
            value={newRecipe.videoUrl}
            placeholder="Video url"
          />
          <button type="submit" onClick={handleSubmitNewRecipe}>
            Add
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
