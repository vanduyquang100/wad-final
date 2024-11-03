import User from "../models/user.model.js";

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
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
