import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true });

  req.user.role;

  const refreshToken = await reply.jwtSign(
    { id: req.user.id, role: req.user.role },
    { sign: { expiresIn: "7d" } }
  );

  const token = await reply.jwtSign({ id: req.user.id, role: req.user.role });

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
