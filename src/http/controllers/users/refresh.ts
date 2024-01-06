import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  await req.jwtVerify({ onlyCookie: true });

  const refreshToken = await reply.jwtSign(
    { id: req.user.id },
    { sign: { expiresIn: "7d" } }
  );

  const token = await reply.jwtSign({ id: req.user.id });

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
