const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// represents a sign up attempt.
// when a user signs up, it will create a document in the
// db with this schema. Only when the user verifies his
// email, a user document will be created and this document
// will be deleted.
const signUpAttemptSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("SignUpAttempt", signUpAttemptSchema);
