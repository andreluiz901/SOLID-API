import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to profile", async () => {
    await request(app.server).post("/users").send({
      name: "valid_name",
      email: "example@email.com",
      password: "valid_password@123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "example@email.com",
      password: "valid_password@123456",
    });

    const token = authResponse.body.token;
    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: "example@email.com",
      })
    );
  });
});
