const express = require("express");
const MyRecipe = require("../models/MyRecipes");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route-1: Get all user-specified recipes
router.get("/getMyRecipes", fetchuser, async (req, res) => {
  try {
    const myRecipes = await MyRecipe.find({ user: req.user.id });
    res.json(myRecipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-2: Add a new user-specified recipe with userId - Login required
router.post(
  "/addMyRecipe",
  fetchuser,
  [
    body("itemName", "item name is too short").isLength({ min: 3 }),
    body("recipe", "Recipe is too short").isLength({ min: 10 }),
  ],
  async (req, res) => {
    const { itemNumber, itemName, ingredients, recipe } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const myRecipe = new MyRecipe({
        user: req.user.id,
        itemNumber,
        itemName,
        ingredients,
        recipe,
      });
      const savedNote = await myRecipe.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server ERROR!");
    }
  }
);

//ROUTE 3: Update an exsisting recipe of user - Login required
router.put("/updateMyRecipe/:id", fetchuser, async (req, res) => {
  const { itemNumber, itemName, ingredients, recipe } = req.body;

  try {
    //Create a new recipe
    const newRecipe = {};
    if (itemName) {
      newRecipe.itemName = itemName;
    }
    if (ingredients) {
      newRecipe.ingredients = ingredients;
    }
    if (recipe) {
      newRecipe.recipe = recipe;
    }

    //Find a recipe to be updated and update it
    let myRecipe = await MyRecipe.findById(req.params.id);
    if (!myRecipe) {
      return res.status(404).send("Not Found");
    }
    if (myRecipe.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    myRecipe = await MyRecipe.findByIdAndUpdate(
      req.params.id,
      { $set: newRecipe },
      { new: true }
    );
    res.json({ myRecipe });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

//ROUTE 4: Delete an exsisting recipe of user - Login required
router.delete("/deleteMyRecipe/:id", fetchuser, async (req, res) => {
  try {
    //Find a recipe to be deleted and delete it
    let myRecipe = await MyRecipe.findById(req.params.id);
    if (!myRecipe) {
      return res.status(404).send("Not Found");
    }
    if (myRecipe.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    myRecipe = await MyRecipe.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .json({ Success: "Recipe has been deleted", recipe: myRecipe });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

module.exports = router;
