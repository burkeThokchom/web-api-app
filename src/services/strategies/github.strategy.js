import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { githubConfig } from "../../config/oauth.config.js";
import authService from "../auth.service.js";

passport.use(
  new GitHubStrategy(
    githubConfig,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.findOrCreateOAuthUser("github", profile);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
