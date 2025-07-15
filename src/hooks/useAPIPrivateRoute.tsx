import { useEffect } from 'react';
import { axiosPrivateInstance } from '../services/APIConfig';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAPIPrivateRoute = () => {
  const { authState: { accessToken } } = useAuth();
  const refresh = useRefreshToken()
 
  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("interceptors.response error ==>", structuredClone(error))
        const originalRequest = error.config;

        // If token expired and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
           console.log("interceptors.response error after ==>", error)
          try {
            const newAccessToken = await refresh()
            // Update the original request with new token
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivateInstance;
};

export default useAPIPrivateRoute;
