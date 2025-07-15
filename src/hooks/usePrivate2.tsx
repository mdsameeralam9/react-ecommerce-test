import { useEffect } from 'react';
import { axiosPrivateInstance } from '../services/APIConfig';
import useAuth from './useAuth';
import axios, { AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

const useAPIPrivateRoute = () => {
  const { accessToken, setAccessToken, setIsLoggedIn } = useAuth();

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
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // Retry limit logic
        if (
          error.response?.status === 401 &&
          (!originalRequest._retry || originalRequest._retryCount! < 1)
        ) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          try {
            const res = await axios.post('/auth/refresh', {}, {
              withCredentials: true,
            });

            const newAccessToken = res.data.accessToken;
            setAccessToken(newAccessToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(originalRequest);
          } catch (refreshError) {
            setIsLoggedIn(false);
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
  }, [accessToken, setAccessToken, setIsLoggedIn]);

  return axiosPrivateInstance;
};

export default useAPIPrivateRoute;
