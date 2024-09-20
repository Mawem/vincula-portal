
import NextAuth, { AuthOptions } from "next-auth";
import otpProvider from "../../../../lib/auth/otpProvider";

export const authOptions: AuthOptions = {
  providers: [otpProvider],
  pages: {
    signIn: "/login",  // Custom sign-in page
  },
  callbacks: {
    async jwt({token, user}: {token: any, user: any}) {
        console.log('jwt callback: ', token, user)
      if (user) {
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({session, token}: {session: any, token: any}) {
        console.log('session callback: ', token, session)
      session.user.access_token = token.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",  // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true 
};