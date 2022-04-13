const express = require("express");
const Favorite = require("../models/Favorite");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    name: "favorite",
    age: 20,
  };
  res.json(obj);
});
module.exports = router;
