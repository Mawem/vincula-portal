import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Returns true if a session exists, false otherwise
  },
});

export const config = {
  matcher: [ '/dashboard/:path*'],
}; 