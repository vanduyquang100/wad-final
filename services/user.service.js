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

  async getAllUsers({
    page = 1,
    limit = 10,
    sortBy = "email",
    sortOrder = "asc",
    filters = {},
    includeBanned = true,
  } = {}) {
    const query = {};

    // Apply filters
    if (filters.name) {
      query.name = new RegExp(filters.name, "i"); // Case-insensitive partial match
    }
    if (filters.email) {
      query.email = new RegExp(filters.email, "i");
    }
    if (filters.roles && filters.roles.length > 0) {
      query.roles = { $in: filters.roles }; // Match any of the specified roles
    }
    if (includeBanned === false) {
      query.bannedDate = { $lte: new Date() }; // Only include non-banned users
    }

    // Pagination and sorting
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const users = await User.find(query).skip(skip).limit(limit).sort(sort);
    const total = await User.countDocuments(query);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      users,
    };
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export const userService = new UserService();
