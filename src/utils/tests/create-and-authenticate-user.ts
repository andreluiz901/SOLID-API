import request from "supertest";
import { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "valid_name",
    email: "example@email.com",
    password: "valid_password@123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "example@email.com",
    password: "valid_password@123456",
  });

  const { token } = authResponse.body;

  return { token };
}
