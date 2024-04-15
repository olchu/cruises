import NextAuth, {
  Account,
  NextAuthOptions,
  Profile, User
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
  callbacks: {
    async signIn(params: {
      user: User;
      account: Account;
      profile: Profile;
      email?: string;
    }) {
      const { user, account, profile, email } = params;
      // console.log('!!!!!!!!!!!!!', user);
      // console.log('!!!!!!!!!!!!!', account);
      // console.log('!!!!!!!!!!!!!', profile);
      // console.log('!!!!!!!!!!!!!', email);
      const userDB = await prisma.admins.findFirst({
        where: {
          email: user?.email || '',
        },
      });
      const isAllowedToSignIn = userDB ? true : false;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return '/404';
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};

export default NextAuth(authOptions as unknown as NextAuthOptions);
