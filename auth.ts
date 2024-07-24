import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    // ? https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      if (!dbUser) {
        return true;
      }

      if (user.email === process.env.ADMIN_EMAIL && dbUser.role !== "ADMIN") {
        await prisma.user.update({
          data: { role: "ADMIN" },
          where: { email: user.email as string },
        });
      }

      return true;
    },
    async session(data) {
      const dbUser = await prisma.user.findUnique({
        where: { email: data.session.user.email },
      });

      if (!dbUser) {
        return data.session;
      }

      return { ...data.session, user: dbUser };
    },
  },
});
