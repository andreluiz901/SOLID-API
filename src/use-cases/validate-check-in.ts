import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumbersOfCheckInsError } from "./errors/max-number-of-check-ins-erro";
import dayjs from "dayjs";
import { LateValidationCheckInError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minute"
    );

    if (distanceInMinutesFromCheckInCreation > 20)
      throw new LateValidationCheckInError();

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
