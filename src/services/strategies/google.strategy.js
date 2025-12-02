import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleConfig } from "../../config/oauth.config.js";
import authService from "../auth.service.js";

passport.use(
  new GoogleStrategy(
    googleConfig,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.findOrCreateOAuthUser("google", profile);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;