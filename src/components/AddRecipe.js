import React, { useContext, useState } from "react";
import { User } from "../context/Context";

const AddRecipe = () => {
  const [recipes, setRecipes] = useState({
    itemNumber: "",
    itemName: "",
    ingredients: "",
    recipe: "",
  });

  const { addRecipe } = useContext(User);

  const handleClick = (e) => {
    e.preventDefault();
    addRecipe(
      recipes.itemNumber,
      recipes.itemName,
      recipes.ingredients,
      recipes.recipe
    );
    setRecipes({ itemNumber: "", itemName: "", ingredients: "", recipe: "" });
  };
  const onChange = (e) => {
    setRecipes({ ...recipes, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3 outer-box addBox">
      <h2>~: Add a recipe :~</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            name="itemName"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            value={recipes.itemName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemNumber" className="form-label">
            Item Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="itemNumber"
            name="itemNumber"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            value={recipes.itemNumber}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients:
          </label>
          <input
            type="text"
            className="form-control"
            id="ingredients"
            name="ingredients"
            onChange={onChange}
            minLength={5}
            autoComplete="off"
            value={recipes.ingredients}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipe" className="form-label">
            Recipe:
          </label>
          <input
            placeholder="..."
            type="text"
            className="form-control"
            id="recipe"
            name="recipe"
            onChange={onChange}
            value={recipes.recipe}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleClick}
          disabled={recipes.itemName.length < 3 || recipes.recipe.length < 10}
        >
          Add recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
