import { Strategy as LocalStrategy } from "passport-local";
import { userService } from "../services/user.service.js";

export const configurePassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await userService.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          const isValidPassword = userService.verifyPassword(
            user.password,
            password
          );

          if (!isValidPassword) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
