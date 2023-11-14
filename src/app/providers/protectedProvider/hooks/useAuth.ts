import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      // Session is still loading, do nothing
      return;
    }

    if (!session) {
      // User is not authenticated, redirect to the login page
      router.push('/api/auth/signin');
    }
  }, [session, status, router]);
  return { session };
};
