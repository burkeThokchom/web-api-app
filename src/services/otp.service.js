import redis from "../db/redis.connect.js";

class OTPService {
  async generateOTP(phone) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${phone}`, otp, "EX", 300); // 5 min expiry
    console.log(`Mock OTP for ${phone}: ${otp}`);
    return otp;
  }

  async verifyOTP(phone, otp) {
    const stored = await redis.get(`otp:${phone}`);
    if (stored !== otp) throw new Error("Invalid OTP");
    await redis.del(`otp:${phone}`);
    return true;
  }
}

export default new OTPService();