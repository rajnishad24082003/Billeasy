const mongoose = require("mongoose");
const userSchema = mongoose.Schema;

const User = new userSchema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", User);
