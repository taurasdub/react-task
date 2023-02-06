export default function RandomRecipe({ setList, list }) {
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
          imageUrl: result.meals[0].strMealThumb,
          videoUrl: result.meals[0].strYoutube,
        };
        setList([...list, result]);
      });
  }

  return <button onClick={handleAddRandomRecipe}>Add Random Recipe</button>;
}
