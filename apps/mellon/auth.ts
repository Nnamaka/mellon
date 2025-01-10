import { PrismaAdapter } from "@auth/prisma-adapter";
// import { getUserById } from "@/actions/dbUtils";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "credentials") return true;

    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser?.emailVerified) return false;
      // you can filter users who login/signup with google here
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

    //   const existingUser = await getUserById(token.sub);

    //   if (!existingUser) return token;

    //   token.role = existingUser.role;

      return token;
    },
    async session({ session, token}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        // session.user.role = token.role as "admin" | "user";
        console.log("nothing to see");
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
