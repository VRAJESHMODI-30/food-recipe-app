import React, { useEffect, useState } from "react";
import Box from "./Box";
import Spinner from "./Spinner";
import "../styles/FoodItem.css";

const FoodItem = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [qurey, setQurey] = useState("");

  useEffect(() => {
    getData();
    //eslint-disable-next-line;
  }, [qurey]);

  const getData = async () => {
    const url = "http://localhost:5000/api/food-items/getFooditems";
    let data = await fetch(url);
    let parsedData = await data.json();
    setFood(parsedData);
    console.log(parsedData);

    setLoading(false);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQurey(search);
  };
  return (
    <>
      <div className="outer-box">
        <h1 className="py-4 text-center text-primary">Best Recipes</h1>
        <div className="input-group searchBar">
          <input
            type="search"
            className="form-control rounded mx-1"
            placeholder="Search recipes..."
            aria-label="Search"
            aria-describedby="search-addon"
            value={search}
            onChange={updateSearch}
          />
          <button
            type="button"
            className="btn btn-outline-primary rounded"
            onClick={getSearch}
          >
            search
          </button>
        </div>
        {loading && <Spinner />}
        <div className="container">
          <div className="row my-4">
            {food.map((element) => {
              if (
                element.itemName.includes(qurey) ||
                element.ingredients.includes(qurey) ||
                element.recipe.includes(qurey)
              ) {
                return (
                  <div className="col-md-4" key={element._id}>
                    <Box
                      itemName={element.itemName ? element.itemName : ""}
                      recipe={element.recipe ? element.recipe : ""}
                      ingredients={
                        element.ingredients ? element.ingredients : ""
                      }
                      imageUrl={element.url}
                      itemNumber={element.itemNumber ? element.itemNumber : ""}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
