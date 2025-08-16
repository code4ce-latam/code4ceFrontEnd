// @ts-nocheck
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated, selectIsLoading } from '@/store/slices/authSlice';

export default function PublicOnly({ children }) {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
