const mongoose = require("mongoose");
const { Schema } = mongoose;

const FooditemSchema = new Schema({
  foodItemNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingrediants: {
    type: Array,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
});
const Food = mongoose.model("food-items", FooditemSchema);
module.exports = Food;
