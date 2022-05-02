import { useState, useReducer, FormEvent, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Container } from '../styles/pages/Login';
import { Input } from '../styles/components/Input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { api, getApiClient } from '../services/api';
import { parseCookies } from 'nookies';

export default function Whatsapp() {
  interface IForm {
    username: string;
    password: string;
  }
  const router = useRouter();
  const { setUser, user, isAuthenticated, signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IForm>();
  const [link, setLink] = useState('');

  /* useEffect(() => {
    if (!!user) router.push('/Home');
  }, [user]); */

  return (
    <Container>
      <h1>Acesse sua conta</h1>
      <form onSubmit={handleSubmit(signIn)}>
        <div>
          <Input
            {...register('username', { required: true })}
            placeholder="Usuário"
          />
          <Input
            {...register('password', { required: true })}
            placeholder="Senha"
            type={'password'}
          />
        </div>
        <div>
          <button type="submit">Entrar</button>
          <p>
            Não tem uma conta?{' '}
            <a onClick={() => router.push('/register')}>Registre-se</a>
          </p>
        </div>
      </form>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);
  console.log('pass ', token);
  if (token) {
    return {
      redirect: {
        destination: '/Home',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
