import React from 'react'
import useAuth from './useAuth'
import { axiosInstance } from '../services/APIConfig';

const useRefreshToken = () => {
  const { setAccessToken, setIsLoggedIn } = useAuth();

  const refresh = async() => {
    try {
        const response = await axiosInstance.post("/refresh-token", { 
            headers: {
                'Content-type': "application/json",
                // "Authorization": `Bearer ${toke}`
            },
            withCredentials: true
        })

        if(!response.data?.ok){
            throw new Error("APi failed to generate access token")
        }

        setAccessToken(response?.data?.accessToken)
        setIsLoggedIn(true)

        return response?.data?.accessToken
    } catch (error) {
        alert(error?.message || "APi failed to generate access token")
    }
  }

  return refresh;
}

export default useRefreshToken