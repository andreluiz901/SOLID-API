import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create gym ", async () => {
    const { token } = await createAndAuthenticateUser(app, "ADMIN");

    const response = await request(app.server)
      .post("/gyms")
      .send({
        title: "gym_name",
        description: "a_gym_description",
        phone: "1122334455",
        latitude: -7.2323491,
        longitude: -39.3135123,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(201);
  });
});
