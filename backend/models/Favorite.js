const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
});
const Fav = mongoose.model("favorite", FavoriteSchema);
module.exports = Fav;
