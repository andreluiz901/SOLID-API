import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcryptjs from "bcryptjs";
import { beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should  be able to get User Profile", async () => {
    const createdUser = await usersRepository.create({
      name: "valid_name",
      email: "valid_email@email.com",
      password_hash: await bcryptjs.hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("valid_name");
  });

  it("Should not  be able to get User Profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-exist-user-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
