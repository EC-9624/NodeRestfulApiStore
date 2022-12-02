const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");

//Sign Up
router.post("/", async (req, res) => {
  try {
    //generate password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    //save to db
    const user = newUser.save();
    res.status(200).json("User Created");
  } catch {}
});
