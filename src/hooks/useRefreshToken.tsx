import useAuth from './useAuth';
import { axiosInstance } from '../services/APIConfig';

interface RefreshTokenResponse {
  ok: boolean;
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAuthState } = useAuth();

  const refresh = async (): Promise<string | undefined> => {
    try {
      const response = await axiosInstance.post<RefreshTokenResponse>(
        '/refresh-token',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log("useRefreshToken ===>", response)

      if (!response.data?.ok) {
        throw new Error('API failed to generate access token');
      }

      setAuthState(a => ({...a, accessToken: response.data.accessToken, isLoggedIn: true}))

      return response.data.accessToken;
    } catch (error: any) {
      alert(error?.message || 'API failed to generate access token');
    }
  };

  return refresh;
};

export default useRefreshToken;
