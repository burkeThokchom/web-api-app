import express from "express";
import { authenticateGoogle, authenticateGitHub } from "../middleware/auth.middleware.js";
import oauthController from "../controllers/oauth.controller.js";

const router = express.Router();

/**
 * @route GET /auth/google
 */
router.get("/google", authenticateGoogle);

/**
 * @route GET /auth/google/callback
 */
router.get("/google/callback", authenticateGoogle, oauthController.oauthCallback);

/**
 * @route GET /auth/github
 */
router.get("/github", authenticateGitHub);

/**
 * @route GET /auth/github/callback
 */
router.get("/github/callback", authenticateGitHub, oauthController.oauthCallback);

export default router;
