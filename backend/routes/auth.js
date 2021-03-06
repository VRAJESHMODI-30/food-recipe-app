const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = "SECRET-KEY";
const fetchuser = require("../middleware/fetchuser");

//ROUTE-1: Create a User using POST "/api/auth/signup". ~ Basically endpoint for SignUp.
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
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Checks whether user already exist with same email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "This email already has been registered...!",
          });
      }

      //Hashing password
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
      success = true;
      res.json({ success, authtoken: authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).res.json({ err: "Internal Server Error...!" });
    }
  }
);

//ROUTE-2:Login a User using POST "/api/auth/login". ~ Basically endpoint for LogIn.
router.post(
  "/login",
  [
    body("email", "Username Invalid").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    //If validation get compromissed then error occur else move forward.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = true;
    const { email, password } = req.body;
    try {
      //Check email:
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }

      //Check password:
      let comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }

      //Creating authtoken for user
      const data = {
        user: {
          id: user.id,
        },
      };
      let authtoken = jwt.sign(data, JWT_KEY);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).res.json({ err: "Internal Server Error...!" });
    }
  }
);

//ROUTE 3: Get loggedIn User details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

module.exports = router;
