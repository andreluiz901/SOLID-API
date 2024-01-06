import { Role } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: Role) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}
