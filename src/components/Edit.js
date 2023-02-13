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
    <div className="updateBody">
      <h1>Update recipe:</h1>
      <form>
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleInput}
          value={item.name}
        />
        <label for="Country">Country</label>
        <input
          type="text"
          name="country"
          onChange={handleInput}
          value={item.country}
        />
        <label for="tags">Tags</label>
        <input
          type="text"
          name="tags"
          onChange={handleInput}
          value={item.tags}
        />
        <label for="preparationInstructions">Preparation instructs</label>
        <input
          type="text"
          name="preparationInstructions"
          onChange={handleInput}
          value={item.preparationInstructions}
        />
        <label for="ingredientsList">Ingredients</label>
        <input
          type="text"
          name="ingredientsList"
          onChange={handleInput}
          value={item.ingredientsList}
          placeholder="List of ingredients"
        />
        <label for="tags">Image (url)</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="image url"
          onChange={handleInput}
          value={item.imageUrl}
        />
        <label for="videoUrl">Video (url)</label>
        <input
          type="text"
          name="videoUrl"
          placeholder="Video url"
          onChange={handleInput}
          value={item.videoUrl}
        />
        <button
          type="submit"
          onClick={() => dispatch(setEdit(false))}
          className="btn"
        >
          Update
        </button>
      </form>
    </div>
  );
}
