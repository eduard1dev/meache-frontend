import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/useAuth';

export const useApi = (
  apiFunc: (data, config) => Promise<AxiosResponse<any, any>>
) => {
  const { handleLogout } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const request = async (data?: any, config?: AxiosRequestConfig<any>) => {
    setLoading(true);

    try {
      const result = await apiFunc(data, config);
      return result.data;
    } catch (err) {
      setError(
        (typeof err?.response?.data == 'string' && err?.response?.data) ||
          'Unexpected Error!'
      );
      toast(
        (typeof err?.response?.data == 'string' && err?.response?.data) ||
          'Unexpected Error!',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: 'error'
        }
      );
      if (
        typeof err?.response?.data == 'string' &&
        err?.response?.data == 'jwt expired'
      ) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    request
  };
};
