import { expect, describe, it } from "vitest";
import { beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbygymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbygymsUseCase;

describe("Fetch nearby gym use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbygymsUseCase(gymsRepository);
  });

  it("Should  be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near gym",
      description: null,
      phone: null,
      latitude: -7.2323491,
      longitude: -39.3135123,
    });

    await gymsRepository.create({
      title: "Far gym",
      description: null,
      phone: null,
      latitude: -7.5126638,
      longitude: -39.7231235,
    });

    const { gyms } = await sut.execute({
      userLatitude: -7.2323491,
      userLongitude: -39.3135123,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near gym" })]);
  });

  // it.skip("Should  be able to search paginated gym history", async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       title: `Javascrypt Gym-${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: -7.2323491,
  //       longitude: -39.3135123,
  //     });
  //   }

  //   const { gyms } = await sut.execute({
  //     query: "Javascrypt",
  //     page: 2,
  //   });

  //   expect(gyms).toHaveLength(2);
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: "Javascrypt Gym-21" }),
  //     expect.objectContaining({ title: "Javascrypt Gym-22" }),
  //   ]);
  // });
});
