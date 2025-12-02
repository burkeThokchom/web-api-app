import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { googleConfig, githubConfig } from "./oauth.config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
dotenv.config();

import authService from "../services/auth.service.js";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// ===== JWT Strategy =====
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await authService.findUserById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

// ===== Google OAuth Strategy =====
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

// ===== GitHub OAuth Strategy =====
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

// ===== Serialize / Deserialize =====
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await authService.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;