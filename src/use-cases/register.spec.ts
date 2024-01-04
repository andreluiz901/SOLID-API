import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import bcryptjs from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("Should  be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "123456",
    });

    const isPasswordCorretlyHashed = await bcryptjs.compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorretlyHashed).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "valid_email@email.com";

    await registerUseCase.execute({
      name: "valid_name",
      email,
      password: "123456",
    });

    expect(() =>
      registerUseCase.execute({
        name: "valid_name",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
