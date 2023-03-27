const express = require("express");
const { userModel } = require("../models/users.model");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
//REGISTER
userRoute.post("/register", async (req, res) => {
  let { name, email, gender, password, age, city, is_married } = req.body;
  age = +age;
  is_married = Boolean(is_married);

  const user = await userModel.findOne({ email });
  if (user) {
    res.status(400).send({ msg: "User already exist, please login" });
  } else {
    try {
      const hashed = await bcrypt.hash(password, 8);
      const newUser = new userModel({
        name,
        email,
        gender,
        password: hashed,
        age,
        city,
        is_married,
      });

      await newUser.save();
      res.status(201).send({ msg: "user registered successfully!" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
});

//LOGIN
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    let result = await bcrypt.compare(password, user.password);
    result
      ? res.status(200).send({
          msg: "login successfull",
          token: jwt.sign({ userId: user._id }, process.env.KEY, {
            expiresIn: "3h",
          }),
        })
      : res.status(400).send({ msg: "login failed!" });
  } else {
    res.status(400).send({ msg: "user doesn't exits, create an account" });
  }
});
module.exports = { userRoute };
