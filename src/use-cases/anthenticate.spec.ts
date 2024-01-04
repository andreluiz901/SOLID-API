import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import bcryptjs from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("Should  be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "valid_name",
      email: "valid_email@email.com",
      password_hash: await bcryptjs.hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "valid_email@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not  be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "invalid_email@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not  be able to authenticate with wrong ṕassword", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "valid_name",
      email: "valid_email@email.com",
      password_hash: await bcryptjs.hash("valid_password", 6),
    });

    await expect(() =>
      sut.execute({
        email: "valid_email@email.com",
        password: "invalid_password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
