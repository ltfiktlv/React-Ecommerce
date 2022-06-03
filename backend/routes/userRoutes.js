import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import guard from "../middlewareAuthorization.js";
const router = express.Router();

const produceToken = (id) => {
  //npm jwt syntax
  return jwt.sign({ id }, process.env.PRIVATE_JWT, {
    expiresIn: "15d",
  });
};
//user authentication for backend
router.post("/login", async (req, res) => {
  // login auth
  try {
    const { email, password } = req.body;

    await User.findOne({ email }).then((user) => {
      //if user exist then compare password
      //password comes from the user
      //user.password comes from the database
      bcrypt.compare(password, user.password, (err, data) => {
        //bcrypt ile hashlenen şifreyi, kullanıcının girdiği şifre ile compare eder.
        //if both data matches, data returns true
        if (data) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            token: produceToken(user._id),
          });
        } else {
          //status code 401 sends Unauthorized user
          res.status(401).json(`Invalid password`);
        }
      });
    });
  } catch (err) {
    res.status(400).json(`Invalid email or/and password`);
  }
});

router.post("/register", async (req, res) => {
  //register user
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    res.status(400).json("You already have an account.");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: produceToken(user._id),
    });
  } else {
    res.status(400).json("Account could not be created.");
  }
});

router.route("/profile").get(guard, async (req, res) => {
  //because it is private page, it is protected with guard middleware
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json("You need to login first.");
  }
});

router.route("/profile").put(guard, async (req, res) => {
  //because it is private page, it is protected with guard middleware
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
  }
  const updateUser = await user.save();
  res.json({
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
    password: updateUser.password,
    isAdmin: updateUser.isAdmin,
    token: produceToken(updateUser._id),
  });
});

export default router;
