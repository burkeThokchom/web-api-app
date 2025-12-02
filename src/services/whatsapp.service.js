import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

class WhatsAppService {
  async sendOTP(phone, otp) {
    return client.messages.create({
      body: `Your OTP is ${otp}`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phone}`,
    });
  }
}

export default new WhatsAppService();