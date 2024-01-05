import { CreateGymUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const creategymUseCase = new CreateGymUseCase(gymsRepository);

  return creategymUseCase;
}
