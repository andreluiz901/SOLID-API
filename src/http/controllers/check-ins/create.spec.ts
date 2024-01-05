import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create check-in ", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascrypt gym",
        latitude: -7.2323491,
        longitude: -39.3135123,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .send({
        latitude: -7.2323491,
        longitude: -39.3135123,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(201);
  });
});
