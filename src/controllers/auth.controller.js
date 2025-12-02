import authService from "../services/auth.service.js";
import otpService from "../services/otp.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.registerUser({ email, password });
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser({ email, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async requestOTP(req, res, next) {
    try {
      const { phone } = req.body;
      const otp = await otpService.generateOTP(phone);
      res.json({ message: "OTP sent (mock)", otp });
    } catch (err) {
      next(err);
    }
  }

  async verifyOTP(req, res, next) {
    try {
      const { phone, otp } = req.body;
      await otpService.verifyOTP(phone, otp);
      res.json({ message: "OTP verified" });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      await authService.logout(token);
      res.json({ message: "Logged out" });
    } catch (err) {
      next(err);
    }
  }

  // WhatsApp OTP request
  async requestWhatsAppOTP(req, res, next) {
    try {
      const { phone } = req.body;
      const otp = await otpService.generateWhatsAppOTP(phone);
      res.json({ message: "WhatsApp OTP sent (mock)", otp });
    } catch (err) {
      next(err);
    }
  }

  // WhatsApp OTP verification
  async verifyWhatsAppOTP(req, res, next) {
    try {
      const { phone, otp } = req.body;
      await otpService.verifyWhatsAppOTP(phone, otp);
      res.json({ message: "WhatsApp OTP verified" });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();