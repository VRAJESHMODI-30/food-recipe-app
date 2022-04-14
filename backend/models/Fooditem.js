const mongoose = require("mongoose");
const { Schema } = mongoose;

const FooditemSchema = new Schema({
  itemNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
});
const Food = mongoose.model("food-item", FooditemSchema);
module.exports = Food;
