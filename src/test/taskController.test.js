import request from "supertest";
import app from "../../index.js";
import jwt from "jsonwebtoken";
// import { configPool } from "../config/config.js";
describe("Task Controller", () => {
  let token;

  beforeAll(async () => {

    const res = await request(app).post("/register").send({
      email: "admin@admin.com",
      password: "password123",
      first_name: "admin",
      last_name: "admin",
      role: "admin",
    });
    token = jwt.sign(
      { id: res.body.id, email: res.body.email, role: res.body.role },
      process.env.SECRET_JWT_KEY, 
      { expiresIn: "1h" }
    );
    console.log(res.body);
    
    // await request(app).post("/register").send({
    //   email: "user@test.com",
    //   password: "password123",
    //   role: "user",
    // });
  });
  test("should create a new task", async () => {
    const res = await request(app)
      .post("/task")
      
      .set("Authorization", `Bearer ${token}`)
      console.log(`bearer ${token}`)
      .send({
        name: "New Task",
        description: "Test Task",
        type: "low",
        status: "pending",
        assigned_to: 2,
      });

    console.log(res.status);
    expect(res.status).toBe(201);

    expect(res.body.task.name).toBe("New Task"); 
    expect(res.body.task.assigned_to).toBeDefined(); 
  });

  test("should get all tasks for admin", async () => {
    const res = await request(app)
      .get("/task")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.tasks).toBeInstanceOf(Array);
  });
});
