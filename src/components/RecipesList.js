import React, { useState } from "react";
import Edit from "./Edit";
import NewRecipe from "./NewRecipe";
import RandomRecipe from "./RandomRecipe";

const data = [
  {
    id: 1,
    name: "pizza",
    tags: ["meat", "cheese", "dough"],
    country: "Italy",
    preparationInstructions: ["1", "2", "3", "4", "5"],
    ingredientsList: ["butter", "sugar"],
    imageUrl:
      "https://nidosreceptai.lt/wp-content/uploads/2018/08/Bulviu-kukuliai-su-varske-6Square-100x100.jpg",
    videoUrl: "https://www.youtube.com/watch?v=g5oCDoyxbBk",
  },
  {
    id: 2,
    name: "orange juice",
    tags: ["orange"],
    country: "china",
    preparationInstructions: ["1", "2", "3", "4", "5"],
    ingredientsList: ["butter", "sugar"],
    imageUrl: "",
    videoUrl: "",
  },
  {
    id: 3,
    name: "cheesburghaa",
    tags: ["meat", "salad", "buns", "tomato"],
    country: "USA",
    preparationInstructions: ["1", "2", "3", "4", "5"],
    ingredientsList: ["butter", "sugar"],
    imageUrl: "",
    videoUrl: "",
  },
];

export default function RecipesList() {
  const [list, setList] = useState(data);
  const [extendedInformation, setExtendedInformation] = useState(null);
  const [edit, setEdit] = useState(false);

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
      <NewRecipe setList={setList} list={list} />
      <RandomRecipe setList={setList} list={list} />
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
              <React.Fragment>
                {item.ingredientsList ? (
                  <p>
                    List of ingredients:
                    {item.ingredientsList.map((item) => (
                      <li>{item}</li>
                    ))}
                  </p>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                <p>
                  Preparation instructions:
                  {item.preparationInstructions.map((listItem) => (
                    <li key={listItem}>{listItem}</li>
                  ))}
                </p>
                <img src={item.imageUrl} alt={item.imageUrl} />

                {item.videoUrl ? (
                  <iframe
                    src={
                      `https://www.youtube.com/embed/` +
                      item.videoUrl.split("=")[1].split("&")[0]
                    }
                    title={item.videoUrl}
                  />
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </React.Fragment>
            )}
            <br />
            <button onClick={() => handleEdit(item.id)}>edit recipe</button>
          </div>
        )
      )}
    </div>
  );
}
