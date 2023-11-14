import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionType extends Session {
  isAdmin: boolean;
}

export const useGetSession = () => {
  const { data, status } = useSession();
  const session: SessionType = {
    ...data,
  } as SessionType;
  const isAdmin = session.isAdmin;

  return { session, status, isAdmin };
};
