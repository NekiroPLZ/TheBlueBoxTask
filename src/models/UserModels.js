import { configPool } from "../config/config.js";

export class userModel {
  static async createUser(
    email,
    password,
    role = "user",
    first_name,
    last_name
  ) {
    try {
      const query = `insert into users (email, password, role, first_name,last_name) values ($1, $2, $3, $4,$5) returning *`;
      const values = [email, password, role, first_name, last_name];
      const result = await configPool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("Error creating user:", err.message);
      throw new Error(err.message);
    }
  }
  static async getUserByEmail(email) {
    try {
      const query = `select id, email, password,role, first_name, last_name, created_at from users where email = $1`;
      const values = [email.trim().toLowerCase()];
      const result = await configPool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user:", err.message);
      throw new Error(err.message);
    }
  }
}
