import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import authService from "../auth.service.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const result = await authService.loginUser({ email, password });
        if (!result) return done(null, false, { message: "Invalid credentials" });
        return done(null, result.user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;