import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/server/user/domain/user.model";
import { authServiceFacade, userServiceFacade } from "@/server/user/application";

 const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await authServiceFacade.authUserLocalDb({email:credentials?.email!,password:credentials?.password!})
        if (!user) {
          return null;
        }
        return {
          id: user.id!,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          rol: user.rolId,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google") {
        const authUser: User = {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          email: user?.email,
          provider: account?.provider,
        };

        try {
          const userDb = await authServiceFacade.authUserExternalProvider(authUser);

          user.id = userDb.id;
          user.email = userDb.email;
          user.firstName = userDb.firstName;
          user.lastName = userDb.lastName;
          user.rolId = userDb.rolId;
        } catch (error) {
          return false;
        }

        return true;
      }
      if(user)return true
      return false
      },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.firstName;
        token.lastName = user.lastName;
        token.rol = user.rolId;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.rol = token.rolId;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
export default authOption
