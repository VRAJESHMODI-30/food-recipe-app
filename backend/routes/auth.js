const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = "SECRET-KEY";

//Create a User using POST "/api/auth/signup". ~ Basically for SignUp.
router.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If validation get compromissed then error occur else move forward.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Checks whether user already exist with same email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "This email already has been registered...!" });
      }

      let salt = await bcrypt.genSalt(10);
      let hashPass = await bcrypt.hash(req.body.password, salt);

      //Create a new User.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      //Creating authtoken for user
      const data = {
        user: {
          id: user.id,
        },
      };
      let authtoken = jwt.sign(data, JWT_KEY);
      res.json({ authtoken: authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).res.json({ err: "Internal Server Error...!" });
    }
  }
);
module.exports = router;
