import { useDispatch } from "react-redux";

export default function Edit({ item, list, setList, setEdit }) {
  const dispatch = useDispatch();

  function handleInput(e) {
    const newList = list.map((li) =>
      li.id === item.id
        ? {
            ...li,
            [e.target.name]:
              e.target.name === "tags" ||
              e.target.name === "preparationInstructions" ||
              e.target.name === "ingredientsList"
                ? e.target.value.split(",").map((tag) => tag)
                : e.target.value,
          }
        : li
    );
    setList(newList);
  }

  return (
    <div>
      <input type="text" name="name" onChange={handleInput} value={item.name} />
      <input
        type="text"
        name="country"
        onChange={handleInput}
        value={item.country}
      />
      <input type="text" name="tags" onChange={handleInput} value={item.tags} />
      <input
        type="text"
        name="preparationInstructions"
        onChange={handleInput}
        value={item.preparationInstructions}
      />
      <input
        type="text"
        name="ingredientsList"
        onChange={handleInput}
        value={item.ingredientsList}
        placeholder="List of ingredients"
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="image url"
        onChange={handleInput}
        value={item.imageUrl}
      />
      <input
        type="text"
        name="videoUrl"
        placeholder="Video url"
        onChange={handleInput}
        value={item.videoUrl}
      />
      <button type="submit" onClick={() => dispatch(setEdit(false))}>
        Update
      </button>
    </div>
  );
}
