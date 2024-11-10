import crypto from "crypto";
import User from "../models/user.model.js";

class UserService {
  hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .createHash("sha256")
      .update(salt + password)
      .digest("hex");
    return `${salt}$${hash}`;
  };

  async createUser(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    userData.password = this.hashPassword(userData.password);

    // Save the new user
    const user = new User(userData);
    return await user.save();
  }

  verifyPassword(storedPassword, inputPassword) {
    const [salt, originalHash] = storedPassword.split("$");
    const hashAttempt = crypto
      .createHash("sha256")
      .update(salt + inputPassword)
      .digest("hex");
    return hashAttempt === originalHash;
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async getAllUsers() {
    return await User.find();
  }
}

export const userService = new UserService();
