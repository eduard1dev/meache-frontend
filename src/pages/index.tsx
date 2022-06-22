import { useState, useReducer, FormEvent, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Container } from '../styles/pages/Login';
import { Input } from '../styles/components/Input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { api, getApiClient } from '../services/api';
import { parseCookies } from 'nookies';
import ReactLoading from 'react-loading';
import Button from '../components/Button';
import Link from 'next/link';

export default function Whatsapp() {
  interface IForm {
    username: string;
    password: string;
  }
  const router = useRouter();
  const { postLoginApi, signIn } = useContext(AuthContext);

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
          <Button loading={postLoginApi.loading} title="Entrar" />
          <p>
            Não tem uma conta?
            <Link href={'/register'}>Registre-se</Link>
          </p>
        </div>
      </form>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
