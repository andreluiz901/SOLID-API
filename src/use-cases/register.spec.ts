import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import bcryptjs from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should  be able to register", async () => {
    const { user } = await sut.execute({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
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
    const email = "valid_email@email.com";

    await sut.execute({
      name: "valid_name",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "valid_name",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
