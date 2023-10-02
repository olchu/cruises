import { ReactNode } from 'react';
import { useAuth } from './hooks/useAuth';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();

  return session && <>{children}</>;
};
