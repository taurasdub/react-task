import React, { useState } from "react";
import Edit from "./Edit";

const data = [
  {
    id: 1,
    name: "pizza",
    tags: ["meat", "cheese", "dough"],
    country: "Italy",
    extendedInformation: "here's extended information about pizza",
    preparationInstructions: ["1", "2", "3", "4", "5"],
  },
  {
    id: 2,
    name: "orange juice",
    tags: ["orange"],
    country: "china",
    extendedInformation: "here's extended information about orange juice",
    preparationInstructions: ["1", "2", "3", "4", "5"],
  },
  {
    id: 3,
    name: "cheesburghaa",
    tags: ["meat", "salad", "buns", "tomato"],
    country: "USA",
    extendedInformation: "here's extended information about cheesburgaa",
    preparationInstructions: ["1", "2", "3", "4", "5"],
  },
];

export default function RecipesList() {
  const [list, setList] = useState(data);
  const [extendedInformation, setExtendedInformation] = useState(null);
  const [edit, setEdit] = useState(false);
  const [addRecipe, setAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    id: null,
    name: "",
    tags: [],
    country: "",
    preparationInstructions: "",
  });
  const [filter, setFilter] = useState({
    name: "",
    tags: "",
    country: "",
  });

  function handleFilter(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  const filteredRecipes = list.filter((recipe) => {
    if (
      recipe.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(filter.tags.toLowerCase())
      ) &&
      recipe.country.toLowerCase().includes(filter.country.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  function handleInput(item) {
    setExtendedInformation(item);
  }

  function handleEdit(item) {
    setEdit(item);
  }

  function handleAddRecipe() {
    setAddRecipe(!addRecipe);
  }

  function handleNewRecipeInput(e) {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]:
        e.target.name === "tags" || e.target.name === "preparationInstructions"
          ? e.target.value.split(",").map((list) => list)
          : e.target.value,
    });
  }

  function handleSubmitNewRecipe() {
    setList([...list, { ...newRecipe, id: list.length + 1 }]);
    setAddRecipe(false);
    setNewRecipe({
      id: null,
      name: "",
      tags: [],
      country: "",
      preparationInstructions: [],
    });
  }

  function handleAddRandomRecipe(e) {
    e.preventDefault();
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => response.json())
      .then((result) => {
        result = {
          id: result.meals[0].idMeal,
          name: result.meals[0].strMeal,
          tags: [result.meals[0].strCategory, result.meals[0].strArea],
          country: result.meals[0].strArea,
          preparationInstructions: [result.meals[0].strInstructions],
        };
        setList([...list, result]);
      });
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="name filter"
          value={filter.name}
          onChange={handleFilter}
        />
        <input
          type="text"
          name="tags"
          placeholder="tag filter"
          value={filter.tags}
          onChange={handleFilter}
        />
        <input
          type="text"
          name="country"
          placeholder="country filter"
          value={filter.country}
          onChange={handleFilter}
        />
      </form>
      <button onClick={handleAddRecipe}>Add Recipe</button>
      <button onClick={handleAddRandomRecipe}>Add Random Recipe</button>
      {addRecipe && (
        <div>
          <input
            type="text"
            name="name"
            onChange={handleNewRecipeInput}
            value={newRecipe.name}
            placeholder="Name"
          ></input>
          <input
            type="text"
            name="tags"
            onChange={handleNewRecipeInput}
            value={newRecipe.tags}
            placeholder="Tags (separated by comma)"
          ></input>
          <input
            type="text"
            name="country"
            onChange={handleNewRecipeInput}
            value={newRecipe.country}
            placeholder="Country"
          ></input>
          <input
            type="text"
            name="preparationInstructions"
            onChange={handleNewRecipeInput}
            value={newRecipe.preparationInstructions}
            placeholder="Preparation instruction"
          ></input>
          <button type="submit" onClick={handleSubmitNewRecipe}>
            Add
          </button>
        </div>
      )}
      {filteredRecipes.map((item) =>
        edit === item.id ? (
          <Edit item={item} list={list} setList={setList} setEdit={setEdit} />
        ) : (
          <div
            key={item.id}
            className="card-body"
            onClick={() => handleInput(item)}
          >
            <h1>{item.name}</h1>
            <ul>
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p>Origin country: {item.country}</p>
            {extendedInformation === item && (
              <p>
                {item.preparationInstructions.map((listItem) => (
                  <li key={listItem}>{listItem}</li>
                ))}
              </p>
            )}
            <button onClick={() => handleEdit(item.id)}>edit recipe</button>
          </div>
        )
      )}
    </div>
  );
}
