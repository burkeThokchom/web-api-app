import { getSession } from "../db/neo4j.connect.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateToken, generateRefreshToken } from "../utils/token.util.js";
import redis from "../db/redis.connect.js";

const USER_LABEL = "User";

class AuthService {
  async registerUser({ email, password }) {
    const hashed = await hashPassword(password);
    const session = getSession();
    try {
      const result = await session.run(
        `CREATE (u:${USER_LABEL} {email: $email, password: $password}) RETURN u`,
        { email, password: hashed }
      );
      return result.records[0].get("u").properties;
    } finally {
      await session.close();
    }
  }

  async loginUser({ email, password }) {
    const session = getSession();
    try {
      const result = await session.run(
        `MATCH (u:${USER_LABEL} {email: $email}) RETURN u`,
        { email }
      );
      if (result.records.length === 0) throw new Error("User not found");

      const user = result.records[0].get("u").properties;
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = generateToken({ id: user.email });
      const refreshToken = generateRefreshToken({ id: user.email });
      return { user, token, refreshToken };
    } finally {
      await session.close();
    }
  }

  async findUserById(id) {
    const session = getSession();
    try {
      const result = await session.run(
        `MATCH (u:${USER_LABEL} {email: $id}) RETURN u`,
        { id }
      );
      if (result.records.length === 0) return null;
      return result.records[0].get("u").properties;
    } finally {
      await session.close();
    }
  }

  async findOrCreateOAuthUser(provider, profile) {
    const session = getSession();
    const email = profile.emails?.[0]?.value || profile.username;
    try {
      let result = await session.run(
        `MATCH (u:${USER_LABEL} {email: $email}) RETURN u`,
        { email }
      );
      if (result.records.length > 0) return result.records[0].get("u").properties;

      result = await session.run(
        `CREATE (u:${USER_LABEL} {email: $email, provider: $provider}) RETURN u`,
        { email, provider }
      );
      return result.records[0].get("u").properties;
    } finally {
      await session.close();
    }
  }

  async logout(token) {
    // Store JWT in Redis blacklist
    await redis.set(`blacklist:${token}`, true, "EX", 60 * 60); // 1 hour expiry
  }
}

export default new AuthService();
