
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,

    },
    followers: [String],
    following: [String],
    friends: [String],
  },
  { timestamps: true }
);
const user = mongoose.model('user', userSchema)
module.exports = user