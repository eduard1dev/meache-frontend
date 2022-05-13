import { useState, useReducer, FormEvent, useEffect } from 'react';
import { Container } from '../styles/pages/Register';
import { Input } from '../styles/components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';

export default function Whatsapp() {
  interface IForm {
    username: string;
    email: string;
    password: string;
  }
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IForm>();
  const [isRegistered, setRegistered] = useState(false);

  const postRegister = (...args: any[]) =>
    api.post('/api/auth/register', ...args);
  const postRegisterApi = useApi(postRegister);

  const onSubmit: SubmitHandler<IForm> = async ({
    username,
    email,
    password
  }) => {
    postRegisterApi.request(
      {
        username,
        email,
        password
      },
      { withCredentials: true }
    );

    setRegistered(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container>
      {isRegistered ? (
        <>
          <h1>
            Pronto! Agora é so verificar sua conta através do email cadastrado.
          </h1>
          <button onClick={handleGoBack}>Voltar para o início</button>
        </>
      ) : (
        <>
          <h1>Crie sua conta</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('username', { required: true })}
              placeholder="username"
            />
            <Input
              {...register('email', { required: true })}
              placeholder="email"
              type="email"
            />
            <Input
              {...register('password', { required: true })}
              placeholder="senha"
              type="password"
            />
            <button type="submit">Criar</button>
          </form>
        </>
      )}
    </Container>
  );
}
