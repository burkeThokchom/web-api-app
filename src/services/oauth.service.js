import authService from "./auth.service.js";

class OAuthService {
  async handleOAuthCallback(provider, profile) {
    return authService.findOrCreateOAuthUser(provider, profile);
  }
}

export default new OAuthService();
