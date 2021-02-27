import request from "supertest";
import createConnection from "../../database";
import { app } from "../../src/app";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create a user with exists e-mail", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
    });

    expect(response.status).toBe(400);
  });
});