import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbygymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbygymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbygymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbygymsUseCaseRequest): Promise<FetchNearbygymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
