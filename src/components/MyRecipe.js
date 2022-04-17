import React, { useContext, useState, useEffect, useRef } from "react";
import { User } from "../context/Context";
import Box from "./Box";
import Spinner from "./Spinner";
import AddRecipe from "./AddRecipe";
import { useNavigate } from "react-router-dom";

const MyRecipe = () => {
  const { userdata, getRecipe, editRecipe } = useContext(User);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [qurey, setQurey] = useState("");
  const [addrecipe, setAddrecipe] = useState(false);
  const [text, setText] = useState("Add recipe +");
  let history = useNavigate();

  const [recipes, setRecipes] = useState({
    id: "",
    eitemNumber: "",
    eitemName: "",
    eingredients: "",
    erecipe: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getRecipe();
    } else {
      alert('To operate "My Recipe" Login first...! ');
      history("/login");
    }
    //eslint-disable-next-line;
  }, []);
  const refToggle = useRef(null);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQurey(search);
  };

  const handleAdd = () => {
    setAddrecipe(!addrecipe);
    if (addrecipe) {
      setText("Add recipe +");
    } else {
      setText("Close prompt -");
      getRecipe();
    }
  };
  return (
    <>
      {addrecipe && <AddRecipe />}
      <div className="outer-box">
        <h1 className="py-4 text-center text-primary">Your Recipes</h1>
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
        <div className="add d-flex justify-content-end px-5 mx-5">
          <button
            ref={refToggle}
            type="button"
            className="btn btn-outline-warning btn-lg px-5 mt-3 fw-bolder"
            onClick={handleAdd}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {text}
          </button>
        </div>
        {/* {loading && <Spinner />} */}
        <div className="container">
          <div className="row my-4">
            {userdata.map((element) => {
              if (
                element.itemName.includes(qurey) ||
                element.ingredients.includes(qurey) ||
                element.recipe.includes(qurey)
              ) {
                return (
                  <div className="col-md-4">
                    <Box
                      key={element._id}
                      itemName={element.itemName ? element.itemName : ""}
                      recipe={element.recipe ? element.recipe : ""}
                      ingredients={
                        element.ingredients ? element.ingredients : ""
                      }
                      imageUrl={""}
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

export default MyRecipe;
