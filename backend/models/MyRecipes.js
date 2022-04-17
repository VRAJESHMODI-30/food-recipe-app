const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Favorite = mongoose.model("myRecipe", FavoriteSchema);
module.exports = Favorite;
