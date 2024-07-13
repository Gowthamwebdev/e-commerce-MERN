import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user'  // default role is 'user' if not specified in the request body.
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
