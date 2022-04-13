const express = require("express");
const Fooditem = require("../models/Fooditem");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    name: "panner butter masala",
    ingrediants: ["panner", "butter", "spices"],
  };
  res.json(obj);
  console.log(req.body);
});
module.exports = router;
