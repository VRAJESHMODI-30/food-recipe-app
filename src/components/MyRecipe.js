import React, { useContext, useState, useEffect } from "react";
import { User } from "../context/Context";
import AddRecipe from "./AddRecipe";
import "../styles/MyRecipe.css";
import { useNavigate } from "react-router-dom";
import Box from "./Box";

const MyRecipe = () => {
  const { userdata, getRecipe } = useContext(User);
  const [search, setSearch] = useState("");
  const [qurey, setQurey] = useState("");
  const [addrecipe, setAddrecipe] = useState(false);
  const [text, setText] = useState("Add recipe +");
  const [display, setDisplay] = useState({});
  let history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getRecipe();
    } else {
      alert('To access "My Recipes" Login first...! ');
      history("/login");
    }
    //eslint-disable-next-line;
  }, []);

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
      setDisplay({});
    } else {
      setText("Close prompt -");
      getRecipe();
      setDisplay({
        filter: "brightness(35%) blur(5px)",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-warning btn-lg px-5 mt-3 fw-bolder addBtn"
        onClick={handleAdd}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {text}
      </button>

      {addrecipe && <AddRecipe />}
      <div className="outer-box py-5 pt-5" style={display}>
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

        <div className="container">
          <div className="row my-4">
            {userdata.map((element) => {
              if (
                element.itemName.includes(qurey) ||
                element.ingredients.includes(qurey) ||
                element.recipe.includes(qurey)
              ) {
                return (
                  <div className="col-md-4" key={element.itemNumber}>
                    <Box
                      itemName={element.itemName ? element.itemName : ""}
                      recipe={element.recipe ? element.recipe : ""}
                      ingredients={
                        element.ingredients ? element.ingredients : ""
                      }
                      itemNumber={element.itemNumber ? element.itemNumber : ""}
                      key={element._id}
                      btn={true}
                      id={element._id}
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
