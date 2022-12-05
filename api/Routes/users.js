const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");

//Sign Up
router.post("/register", async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      res.status(409).json("Email already exist");
    } else {
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
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Username not Found");

    //validate password
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Wrong password");

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all user for testing perpose only
router.get("/", async (req, res) => {
  const users = await User.find().catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(users);
});

module.exports = router;
