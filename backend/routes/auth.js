const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", (req, res) => {
  obj = {
    name: "Vrajesh Modi",
    age: 20,
  };
  console.log(typeof obj);
});
module.exports = router;
