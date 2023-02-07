import React, { useState } from "react";
import Edit from "./Edit";
import NewRecipe from "./NewRecipe";
import RandomRecipe from "./RandomRecipe";
import data from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/filter";
import { setExtendedInformation } from "../redux/extendedInfo";
import { setEdit } from "../redux/edit";

export default function RecipesList() {
  const filter = useSelector((state) => state.filter);
  const extendedInformation = useSelector((state) => state.extendedInformation);
  const edit = useSelector((state) => state.edit);
  const [list, setList] = useState(data);

  const dispatch = useDispatch();

  function handleFilter(e) {
    dispatch(
      setFilter({
        name: e.target.name,
        value: e.target.value,
      })
    );
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
    dispatch(setExtendedInformation(item));
  }

  function handleEdit(item) {
    dispatch(setEdit(item));
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

                {item.imageUrl ? (
                  <React.Fragment>
                    <p>Photo of the final result:</p>
                    <img src={item.imageUrl} alt={item.imageUrl} />
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}

                {item.videoUrl ? (
                  <React.Fragment>
                    <p>Video tutorial:</p>
                    <iframe
                      src={
                        `https://www.youtube.com/embed/` +
                        item.videoUrl.split("=")[1].split("&")[0]
                      }
                      title={item.videoUrl}
                    />
                  </React.Fragment>
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
