import { Schema, model } from "mongoose";
import { ROLES } from "../constants/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: null,
    },
    bannedTimestamp: {
      type: Number,
      default: null,
    },
    roles: {
      type: [String],
      default: [ROLES.USER],
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
