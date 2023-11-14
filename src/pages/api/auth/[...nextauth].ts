import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import YandexProvider from 'next-auth/providers/yandex';
import prisma from 'prisma/client';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // YandexProvider({
    //   clientId: process.env.YANDEX_CLIENT_ID || '',
    //   clientSecret: process.env.YANDEX_CLIENT_SECRET || '',
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks: {
  //   async session({ session }: { session: Session & { isAdmin: boolean } }) {
  //     const users = await prisma.users.findMany();
  //     const adminUsers = users
  //       .filter((user) => user.permitions === 'rw')
  //       .map((user) => user.email);
  //     if (adminUsers.includes(session.user?.email || '')) {
  //       session.isAdmin = true;
  //       return session;
  //     } else {
  //       return session;
  //     }
  //   },
  // },
};
 
export default NextAuth(authOptions as unknown as  NextAuthOptions);
