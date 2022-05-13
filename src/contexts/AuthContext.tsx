import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch
} from 'react';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import { SubmitHandler } from 'react-hook-form';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useApi } from '../hooks/useApi';

interface IUser {
  username: string;
  hasWhatsappLink: boolean;
  id: string;
  whatsappLink: URL;
  userLinks: URL[];
  userUrl: string;
}

interface IForm {
  username: string;
  password: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  signIn: SubmitHandler<IForm>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState<IUser>({} as IUser);

  const postLogin = (...args: any) => api.post('/api/auth/login', ...args);
  const postLoginApi = useApi(postLogin);

  const isAuthenticated = !!user;

  const signIn: SubmitHandler<IForm> = async ({ username, password }) => {
    postLoginApi
      .request(
        {
          username,
          password
        },
        { withCredentials: true }
      )
      .then((data) => {
        if (data) {
          const token = data.accessToken;
          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1 // 1 hour
          });

          api.defaults.headers['token'] = '';
          api.defaults.headers['token'] = `Bearer ${token}`;

          setUser({ ...user, ...data });

          route.push('/home');
        }
      });

    /* try {
      const response = await api.post(
        '/api/auth/login',
        {
          username,
          password
        },
        { withCredentials: true }
      );

      const token = response.data.accessToken;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1 // 1 hour
      });

      api.defaults.headers['token'] = '';
      api.defaults.headers['token'] = `Bearer ${token}`;

      setUser({ ...user, ...response.data });

      route.push('/Home');
    } catch (error) {
      console.log(error.response.data);
      toast(error.response.data, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error'
      });
    }*/
  };

  const handleLogout = () => {
    api.defaults.headers['token'] = '';
    destroyCookie(undefined, 'nextauth.token');

    route.push('/');

    setUser({} as IUser);
  };

  const getUser = () => api.get('/api/user');
  const getUserApi = useApi(getUser);

  const getUserData = () => {
    getUserApi.request().then((data) => {
      setUser({ ...user, ...data });
    });
  };

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      getUserData();
    }

    if (token || route.asPath == '/verify' || route.asPath == '/r/[userUrl]') {
      console.log(token, 'verify', route.asPath);
    } else {
      route.push('/');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, signIn, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
