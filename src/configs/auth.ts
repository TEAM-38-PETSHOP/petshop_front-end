import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser, login } from "@/helpers/fetchAuthorization";
import { IUser } from "@/types/User";
import { CustomSession } from "@/types/CustomSession";
import { CustomJWT } from "@/types/CustomJWT";

const tokenExpires = 36000000;

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const dataToken = await login(
            credentials.email,
            credentials.password
          );
          const user = await getUser(dataToken.token);

          return {
            ...user,
            token: dataToken.token,
            tokenExpires: Date.now() + tokenExpires,
          } as unknown as IUser;
        } catch (error: any) {
          throw new Error(error.message as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const customToken = token as CustomJWT;

      if (user) {
        const customUser = user as IUser;
        customToken.accessToken = customUser.token;
        customToken.user = customUser;
        customToken.tokenExpires = customUser.tokenExpires;
      }

      if (trigger === 'update' && session?.user) {
        customToken.user = session.user;
      }

      if (customToken.tokenExpires && Date.now() > customToken.tokenExpires) {
        return {};
      }

      return customToken;
    },
    async session({ session, token }) {
      const customSession = session as unknown as CustomSession;
      const customToken = token as CustomJWT;
      if (customToken.accessToken) {
        customSession.accessToken = customToken.accessToken;
        customSession.user = customToken.user as IUser;
      }
      customSession.expires = new Date(customToken.tokenExpires).toISOString();
      return customSession;
    },
  },
  pages: {
    signIn: "/auth",
  },
};
