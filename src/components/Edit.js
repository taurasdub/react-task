export default function Edit({ item, list, setList, setEdit }) {
  function handleInput(e) {
    const newList = list.map((li) =>
      li.id === item.id
        ? {
            ...li,
            [e.target.name]:
              e.target.name === "tags"
                ? e.target.value.split(",").map((tag) => tag.trim())
                : e.target.value,
          }
        : li
    );
    setList(newList);
  }

  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={handleInput}
        value={item.name}
      ></input>
      <input
        type="text"
        name="country"
        onChange={handleInput}
        value={item.country}
      ></input>
      <input
        type="text"
        name="tags"
        onChange={handleInput}
        value={item.tags.join(", ")}
      ></input>
      <button type="submit" onClick={() => setEdit(false)}>
        Update
      </button>
    </div>
  );
}
