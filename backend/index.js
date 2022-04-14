const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/food-items", require("./routes/foodItems"));
app.use("/api/myRecipe", require("./routes/myRecipes"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
