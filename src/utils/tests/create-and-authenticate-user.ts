import request from "supertest";
import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { Role } from "@prisma/client";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role?: Role
) {
  const user = await prisma.user.create({
    data: {
      name: "valid_name",
      email: "example@email.com",
      password_hash: await hash("valid_password@123456", 6),
      role: role,
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "example@email.com",
    password: "valid_password@123456",
  });

  const { token } = authResponse.body;

  return { token };
}
