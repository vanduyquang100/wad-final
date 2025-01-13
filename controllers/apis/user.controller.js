import { userService } from "../../services/user.service.js";
import passport from "passport";

class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMe(req, res) {
    try {
      if (!req.user) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = await userService.updateUser(req.user._id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "email",
        sortOrder = "asc",
        name,
        email,
        roles,
        includeBanned = true,
      } = req.query;

      const filters = {
        ...(name && { name }),
        ...(email && { email }),
        ...(roles && { roles: roles.split(",") }),
      };

      const users = await userService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
        sortOrder,
        filters,
        includeBanned:
          includeBanned === "true"
            ? true
            : includeBanned === "false"
            ? false
            : undefined,
      });

      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async logInUser(req, res, next) {
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal server error", error: err });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info.message || "Invalid credentials" });
      }

      // Check if user is banned
      if (user.bannedDate && new Date(user.bannedDate) > new Date()) {
        return res.status(403).json({
          message: "Your account is banned.",
          bannedUntil: user.bannedDate,
        });
      }

      req.login(user, (loginErr) => {
        if (loginErr) {
          return res
            .status(500)
            .json({ message: "Login failed", error: loginErr });
        }

        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
          },
        });
      });
    })(req, res, next);
  }
}

export const userController = new UserController();
