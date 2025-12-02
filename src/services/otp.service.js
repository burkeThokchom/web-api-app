import redis from "../db/redis.connect.js";
import WhatsAppService from "./whatsapp.service.js";

class OTPService {
  async generateOTP(phone) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${phone}`, otp, "EX", 300); // 5 min expiry
    console.log(`Mock OTP for ${phone}: ${otp}`);
    return otp;
  }

  async verifyOTP(phone, otp) {
    const stored = await redis.get(`otp:${phone}`);
    if (!stored || stored !== otp) throw new Error("Invalid OTP");
    await redis.del(`otp:${phone}`);
    return true;
  }

  async generateWhatsAppOTP(phone) {
      // Reuse the same Redis storage and OTP generation
      const otp = await this.generateOTP(phone);
      
      // Mock sending via WhatsApp
      console.log(`Sending OTP via WhatsApp to ${phone}: ${otp}`);
      await WhatsAppService.sendOTP(phone, otp);
      // Later: integrate Twilio / WhatsApp API here
      return otp;
    }

    async verifyWhatsAppOTP(phone, otp) {
      // Verification logic is identical
      return this.verifyOTP(phone, otp);
    }
}

export default new OTPService();