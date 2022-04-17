const express = require("express");
const Fooditem = require("../models/Fooditem");
const router = express.Router();

//ROUTE-1: Get all recipes from food-items collection/API:
router.get("/getFooditems", async (req, res) => {
  try {
    const fooditems = await Fooditem.find();
    res.json(fooditems);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-2: Add recipes to the food-items collection/API:
router.post("/addFoodItem", async (req, res) => {
  const { itemNumber, itemName, ingredients, recipe, url } = req.body;
  try {
    const fooditem = new Fooditem({
      itemNumber,
      itemName,
      ingredients,
      recipe,
      url,
    });
    const savedNote = await fooditem.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-3: Update recipe in the food-items collection/API:
router.put("/updateFoodItem/:id", async (req, res) => {
  const { itemName, ingredients, recipe } = req.body;

  try {
    //Create a new recipe
    const newItem = {};
    if (itemName) {
      newItem.itemName = itemName;
    }
    if (ingredients) {
      newItem.ingredients = ingredients;
    }
    if (recipe) {
      newItem.recipe = recipe;
    }

    //Find a fooditem to be updated and update it
    let fooditem = await Fooditem.findById(req.params.id);
    if (!fooditem) {
      return res.status(404).send("Not Found");
    }

    fooditem = await Fooditem.findByIdAndUpdate(
      req.params.id,
      { $set: newItem },
      { new: true }
    );
    res
      .status(202)
      .json({ Success: "FoodItem has been deleted", fooditem: fooditem });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

//ROUTE-4: Delete an exsisting fooditem from food-items collection/API:
router.delete("/deleteFoodItem/:id", async (req, res) => {
  try {
    //Find a fooditem to be deleted and delete it
    let fooditem = await Fooditem.findById(req.params.id);
    if (!fooditem) {
      return res.status(404).send("Not Found");
    }
    fooditem = await Fooditem.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .json({ Success: "FoodItem has been deleted", fooditem: fooditem });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

module.exports = router;
