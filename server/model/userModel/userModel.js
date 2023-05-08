/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, trim: true, require: true },
    username: { type: String, trim: true, require: true, unique: true },
    email: { type: String, trim: true, require: true, unique: true },
    password: { type: String, require: true },
    p_img: { type: String, default: "" }, // user profile image
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", UserSchema);
