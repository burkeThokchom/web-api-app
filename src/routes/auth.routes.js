import express from "express";
import authController from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 */
router.post("/register", authController.register);

/**
 * @route POST /auth/login
 * @desc Login user
 */
router.post("/login", authController.login);

/**
 * @route POST /auth/otp/request
 * @desc Request OTP (mock)
 */
router.post("/otp/request", authController.requestOTP);

/**
 * @route POST /auth/otp/verify
 * @desc Verify OTP
 */
router.post("/otp/verify", authController.verifyOTP);

router.post("/otp/whatsapp/request", authController.requestWhatsAppOTP);
router.post("/otp/whatsapp/verify", authController.verifyWhatsAppOTP);
/**
 * @route POST /auth/logout
 * @desc Logout user
 */
router.post("/logout", authenticateJWT, authController.logout);


export default router;
