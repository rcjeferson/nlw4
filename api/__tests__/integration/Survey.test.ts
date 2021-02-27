import request from "supertest";
import createConnection from "../../database";
import { app } from "../../src/app";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Some title example",
      description: "Some description example",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all created surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Some a new title example",
      description: "Some a new description example",
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});