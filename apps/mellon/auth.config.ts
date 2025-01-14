import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import { getUserByEmail } from "@/actions/dbUtils";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { prisma } from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
              data: { email, passwordHash: hashedPassword },
            });

            return { id: newUser.id, email: newUser.email };
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
          );
          if (!passwordMatch) throw new Error("Invalid Credentials");

          return { id: user.id, email: user.email };
          //   const user = await getUserByEmail(email);
          //   if (!user || !user.password) return null;

          //   const passwordMatch = await bcrypt.compare(password, user.password);

          //   if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
