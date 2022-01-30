const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: false,
    },
    receiverName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema)