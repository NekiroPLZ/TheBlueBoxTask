import request from "supertest";
import app from "../../index.js"; // Ajustá la ruta según dónde esté tu archivo principal

describe("User Controller - Register Endpoint", () => {
  test("should register a new user", async () => {
    
    const res = await request(app).post("/register").send({
      email: "admin@admin.com",
      password: "password123",
      first_name: "admin",
      last_name: "admin",
      role: "admin",
    });

    console.log("Response body:", res.body); // Para ver qué devuelve.
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined(); // Chequea que el usuario fue creado.
    expect(res.body.token).toBeDefined(); // Chequea que el token fue generado.
  });
});
