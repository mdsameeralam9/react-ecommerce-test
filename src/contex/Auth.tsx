import React, { createContext, useState } from 'react';

interface AuthDataInterface {
  accessToken: string;
  isLoggedIn:boolean;
}

interface AuthContextType {
  authState: AuthDataInterface;
  setAuthState: React.Dispatch<React.SetStateAction<AuthDataInterface>>;
}

// Create context with default undefined
export const AuthContext = createContext<AuthContextType |undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthDataInterface>({ accessToken: "", isLoggedIn: false});
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
