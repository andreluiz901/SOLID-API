import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsuseCase } from "@/use-cases/factories/make-search-gym-use-case";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParamsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymQueryParamsSchema.parse(req.query);

  const searchGymUseCase = makeSearchGymsuseCase();

  const { gyms } = await searchGymUseCase.execute({
    query: query,
    page,
  });

  return reply.status(200).send({ gyms });
}
