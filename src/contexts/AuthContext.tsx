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
  userLinks: UserLinkProps[];
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
  postLoginApi: ReturnType<typeof useApi>;
}

export interface UserLinkProps {
  name: string;
  link: string;
  animation?: 'shake' | 'color';
  colorTheme?: {
    primary: string;
    secondary: string;
  };
  itemType: 'title' | 'link';
  _id: string;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState<IUser>({ userLinks: [] } as IUser);

  const postLogin = (...args: any) => api.post('/api/auth/login', ...args);
  const postLoginApi = useApi(postLogin);

  const isAuthenticated = !!user.userUrl;

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
  };

  const handleLogout = () => {
    api.defaults.headers['token'] = '';
    destroyCookie(undefined, 'nextauth.token');

    route.push('/');

    setUser({} as IUser);
  };

  const getUser = () => api.get('/api/user');
  const getUserApi = useApi(getUser);

  const getUserData = async () => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      await getUserApi.request().then((data) => {
        setUser({ ...user, ...data });
      });
    }

    if (
      !(
        token ||
        route.asPath.includes('verify') ||
        route.asPath === '/r/[userUrl]' ||
        route.asPath.includes('/redirect')
      )
    ) {
      route.push('/');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        signIn,
        handleLogout,
        postLoginApi
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
