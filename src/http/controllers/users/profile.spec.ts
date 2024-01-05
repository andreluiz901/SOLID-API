import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to profile", async () => {
    const { token } = await createAndAuthenticateUser(app);
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
