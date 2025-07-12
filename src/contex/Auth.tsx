import React, { createContext, useContext, useState } from 'react';

const AuthContext  = createContext();
export const getAuthUser = () => useContext(AuthContext)


const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider
     value={{
      isLoggedIn, 
      setIsLoggedIn,
      accessToken,
      setAccessToken
     }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider