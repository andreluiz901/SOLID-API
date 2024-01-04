import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import bcryptjs from "bcryptjs";

describe("Register Use Case", () => {
  it("Should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

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
});
