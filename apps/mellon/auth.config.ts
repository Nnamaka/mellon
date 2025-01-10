import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import { getUserByEmail } from "@/actions/dbUtils";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
// import bcrypt from "bcryptjs";

export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email } = validatedFields.data;
          console.log("here");
        //   const user = await getUserByEmail(email);
        //   if (!user || !user.password) return null;

        //   const passwordMatch = await bcrypt.compare(password, user.password);

        //   if (passwordMatch) return user;
          if (!email) console.log("showing");
          else throw new Error("something went wrong. ?password");
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
