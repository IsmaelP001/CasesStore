import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../../database/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import {
  user as userTable,
  cart as cartTable,
} from "../../../../database/schemes";
import { cookies } from "next/headers";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
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
      async authorize(credentials, req) {
        const user = await db.query.user.findFirst({
          with: {
            rol: true,
            cart: true,
          },
          where: eq(userTable.email, credentials?.email),
        });

        if (!user) throw new Error("email/Usuario no encontrado");

        if (!bcrypt.compareSync(credentials?.password, user.password)) {
          throw new Error("password/Contraseña incorrecta");
        }
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          rol: user.rol?.rol,
          cartId: user.cart.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user) return null;
      if (account.provider === "google") {
        const dbUser = await db.query.user.findFirst({
          with: {
            rol: true,
            cart: true,
          },
          where: eq(userTable.email, user.email),
        });

        if (dbUser) {
          user.id = dbUser?.id;
          user.cartId = dbUser?.cart?.id;
          user.rol = dbUser?.rol?.rol;
        } else {
          const [newUser] = await db
            .insert(userTable)
            .values({
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              email: user?.email,
              provider: account?.provider,
            })
            .returning();

          //create cartId
          const [cart] = await db
            .insert(cartTable)
            .values({ userId: newUser?.id })
            .returning();
          user.id = newUser.id;
          user.rol = "customer";
          user.cartId = cart?.id;
        }
        return true;
      }
      return true
    },
    //called after user sign in and redirected back to our app
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.firstName;
        token.cartId = user.cartId;
        token.rol = user.rol;
        // Agrega cualquier otra propiedad del usuario
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.firstName;
        session.user.cartId = token.cartId;
        session.rol = token.rol;

        // Agrega cualquier otra propiedad del token
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
