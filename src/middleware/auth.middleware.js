import passport from "passport";

export const authenticateJWT = passport.authenticate("jwt", { session: false });

export const authenticateGoogle = passport.authenticate("google", { scope: ["profile", "email"] });

export const authenticateGitHub = passport.authenticate("github", { scope: ["user:email"] });
