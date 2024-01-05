import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const getUserMeticsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMeticsUseCase.execute({
    userId: req.user.id,
  });
  return reply.status(200).send({ checkInsCount });
}
