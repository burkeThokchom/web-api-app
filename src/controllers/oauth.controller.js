import oauthService from "../services/oauth.service.js";

class OAuthController {
  async oauthCallback(req, res, next) {
    try {
      const provider = req.params.provider; // "google" or "github"
      const user = await oauthService.handleOAuthCallback(provider, req.user);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }
}

export default new OAuthController();