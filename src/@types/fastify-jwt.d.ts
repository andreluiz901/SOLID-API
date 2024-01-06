import "@fastify/jwt";
import { Role } from "@prisma/client";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    payload?: { id: number; role: Role };
    user: {
      id: string;
      role: Role;
    };
  }
}
