import { expect, describe, it, vi, afterEach } from "vitest";
import { beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumbersOfCheckInsError } from "./errors/max-number-of-check-ins-erro";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "academia do bairro",
      description: "A melhor academia do bairro",
      phone: "",
      latitude: -7.2323491,
      longitude: -39.3135123,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should  be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2323491,
      userLongitude: -39.3135123,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 2, 2, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2323491,
      userLongitude: -39.3135123,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -7.2323491,
        userLongitude: -39.3135123,
      })
    ).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError);
  });

  it("Should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 2, 2, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2323491,
      userLongitude: -39.3135123,
    });

    vi.setSystemTime(new Date(2024, 2, 3, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2323491,
      userLongitude: -39.3135123,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "academia do bairro2",
      description: "A melhor academia do bairro2",
      phone: "",
      latitude: new Decimal(-7.2258168),
      longitude: new Decimal(-39.3269789),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-02",
        userLatitude: -7.2323491,
        userLongitude: -39.3135123,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
