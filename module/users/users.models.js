const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: null },
  resetCode: { type: String },
  resetCodeExpiry: { type: Date },
//   permissions: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);
