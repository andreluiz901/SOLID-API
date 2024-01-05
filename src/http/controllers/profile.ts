import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify();

  req.user;

  return reply.status(200).send({ a: req.user });
}
