import { User } from "@prisma/client";

import { DefaultSession } from "next-auth";

// ? https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}
