import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "RESIDENT" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role: "RESIDENT" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "RESIDENT" | "ADMIN";
  }
}