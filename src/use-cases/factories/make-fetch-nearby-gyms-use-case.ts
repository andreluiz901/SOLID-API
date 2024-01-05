import { FetchNearbygymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbygymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNearbygymsUseCase = new FetchNearbygymsUseCase(gymsRepository);

  return fetchNearbygymsUseCase;
}
