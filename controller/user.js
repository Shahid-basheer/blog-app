

const router = require("express").Router();
const user = require("../models/user");
const post = require("../models/posts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// update user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    profilePic: req.body.profilePic,
  };

  try {
    const response = await user.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    );
    let userD = await response.save();
    const token = await jwt.sign({ userD }, "mysecret", { expiresIn: "1d" });
    console.log(token);
    res.status(200).json({ auth: true, token: token, userD,message:'Successfully Updated' });
  } catch (e) {
    console.log(e);
    res.status(500).json(e );
  }
};
// delete one user
const deleteUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      var users = await user.findById(req.params.id);
      await post.deleteMany({ username: user.username });
      await user.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted .....");
    } else {
      res.status(401).json("you can delete only your account...");
    }
  } catch (err) {
    res.status(500).json(err + " err bro");
  }
};

//get one user
const getOneUser = async (req, res) => {

  try {
    let users = await user.findById(req.params.id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json("can not find user");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all users
const getAllUsers = (req, res) => {

  user.find({}, (e, done) => {
    if (!e) {
      console.log(done);
      res.status(200).json(done);
    } else {
        console.log(e)
      res.status(500).json(e);
    }
  });
};


module.exports = { updateUser, deleteUser, getOneUser, getAllUsers };
