import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser, login } from '@/helpers/fetchAuthorization';
import { IUser } from '@/types/User';
import { CustomSession } from '@/types/CustomSession';

interface CustomJWT extends Record<string, unknown> {
  accessToken: string;
  user: User;
}

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
        },
        password: { label: 'Password', type: 'password', required: true },
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
          } as unknown as IUser;
        } catch (error: any) {
          throw new Error(error.message as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomJWT;
      if (user) {
        const customUser = user as IUser;
        customToken.accessToken = customUser.token;
        customToken.user = customUser;
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
      customSession.expires = session.expires;
      return customSession;
    },
  },
  pages: {
    signIn: '/auth',
  },
};
