const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    handle: { type: String, unique: true },
    title: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
