import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "valid_name",
      email: "example@email.com",
      password: "valid_password@123456",
    });
    expect(response.statusCode).toBe(201);
  });
});
