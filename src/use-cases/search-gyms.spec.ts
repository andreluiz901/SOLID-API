import { expect, describe, it } from "vitest";
import { beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms history use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("Should  be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascrypt gym",
      description: null,
      phone: null,
      latitude: -7.2323491,
      longitude: -39.3135123,
    });

    await gymsRepository.create({
      title: "typescrypt gym",
      description: null,
      phone: null,
      latitude: -7.2323491,
      longitude: -39.3135123,
    });

    const { gyms } = await sut.execute({
      query: "Javascrypt",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascrypt gym" }),
    ]);
  });

  it("Should  be able to search paginated gym history", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascrypt Gym-${i}`,
        description: null,
        phone: null,
        latitude: -7.2323491,
        longitude: -39.3135123,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascrypt",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascrypt Gym-21" }),
      expect.objectContaining({ title: "Javascrypt Gym-22" }),
    ]);
  });
});
