import { getSession } from "../db/neo4j.connect.js";

const USER_LABEL = "User";

class UserService {
  async getAllUsers() {
    const session = getSession();
    try {
      const result = await session.run(`MATCH (u:${USER_LABEL}) RETURN u`);
      return result.records.map((r) => r.get("u").properties);
    } finally {
      await session.close();
    }
  }
}

export default new UserService();
