import { useContext, useDebugValue } from 'react'
import { AuthContext } from '../contex/Auth'

const useAuth = () => {
  const context = useContext(AuthContext);

  useDebugValue(context?.isLoggedIn, (isLoggedIn) =>
    isLoggedIn ? 'User Logged In' : 'Not Logged In'
  );

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth