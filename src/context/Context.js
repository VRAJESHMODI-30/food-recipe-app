import React, { createContext, useState } from "react";

export const User = createContext();
const host = "http://localhost:5000";
const Context = ({ children }) => {
  const [userdata, setUserdata] = useState([]);

  //-----------------Get all userdata---------------
  const getRecipe = async () => {
    console.log("Getting user's all userdata");

    //API call
    const url = `${host}/api/myRecipe/getMyRecipes`;
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setUserdata(json);
  };

  //----------------Add Recipe---------------
  const addRecipe = async (itemNumber, itemName, ingredients, recipe) => {
    console.log("Adding a new recipe");

    //API call
    const url = `${host}/api/myRecipe/addMyRecipe`;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ itemNumber, itemName, ingredients, recipe }),
    });
    const Recipe = await response.json();
    setUserdata(userdata.concat(Recipe));
  };

  //---------------Delete recipe-------------
  const deleteRecipe = async (id) => {
    console.log("Deleting the recipe of id:" + id);

    //API call
    const url = `${host}/api/myRecipe/deleteMyRecipe/${id}`;
    await fetch(url, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newRecipe = userdata.filter((Recipe) => {
      return Recipe._id !== id;
    });
    setUserdata(newRecipe);
  };

  //--------------Update recipe----------------
  const editRecipe = async (id, itemNumber, itemName, ingredients, recipe) => {
    //API call
    const url = `${host}/api/myRecipe/updateMyRecipe/${id}`;
    const response = await fetch(url, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ itemNumber, itemName, ingredients, recipe }),
    });
    const json = await response.json();
    console.log(json);

    let newRecipe = JSON.parse(JSON.stringify(userdata));
    for (let i = 0; i < newRecipe.length; i++) {
      if (newRecipe[i]._id === id) {
        newRecipe[i].itemNumber = itemNumber;
        newRecipe[i].itemName = itemName;
        newRecipe[i].ingredients = ingredients;
        newRecipe[i].recipe = recipe;
        break;
      }
    }
    setUserdata(newRecipe);
  };

  return (
    <User.Provider
      value={{
        userdata,
        setUserdata,
        getRecipe,
        addRecipe,
        deleteRecipe,
        editRecipe,
      }}
    >
      {children}
    </User.Provider>
  );
};

export default Context;
