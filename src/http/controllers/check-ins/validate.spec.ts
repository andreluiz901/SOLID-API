import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Validate Check-in (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to validate check-in ", async () => {
    const { token } = await createAndAuthenticateUser(app, "ADMIN");

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "Javascrypt gym",
        latitude: -7.2323491,
        longitude: -39.3135123,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .send({})
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
