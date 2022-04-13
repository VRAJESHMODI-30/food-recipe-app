const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/food-recipe-app?readPreference=primary&directConnection=true&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully!");
  });
};

module.exports = connectToMongo;
