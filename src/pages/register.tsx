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
    clearErrors,
    formState: { errors }
  } = useForm<IForm>({ shouldFocusError: false });
  const [isRegistered, setRegistered] = useState(false);

  const postRegister = (...args: any[]) =>
    api.post('/api/auth/register', ...args);
  const postRegisterApi = useApi(postRegister);

  const onSubmit: SubmitHandler<IForm> = async ({
    username,
    email,
    password
  }) => {
    postRegisterApi
      .request(
        {
          username,
          email,
          password
        },
        { withCredentials: true }
      )
      .then((data) => {
        if (data) {
          setRegistered(true);
        }
      });
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
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 100
              })}
              placeholder="username"
              hasError={!!errors?.username}
            />
            <Input
              {...register('email', {
                required: true
              })}
              placeholder="email"
              hasError={!!errors?.email}
              type="email"
            />
            <Input
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 100,
                validate: {
                  hasNumber: (v) => !!v.match(/\d/),
                  hasUpperCase: (v) => !!v.match(/[A-Z]/),
                  hasLowerCase: (v) => !!v.match(/[a-z]/),
                  hasNonalphas: (v) => !!v.match(/\W/)
                }
              })}
              placeholder="senha"
              //type="password"
              hasError={!!errors?.password}
              onChange={() => {
                if (!!errors?.password) {
                  clearErrors('password');
                }
              }}
            />
            {!!errors?.password && (
              <span role={'alert'}>
                Sua senha deve conter:
                <br />- De 8 a 100 caracteres;
                <br />- Pelo menos uma letra maiuscula e minuscula;
                <br />- Pelo menos 1 número;
                <br />- Pelo menos um caractere especial.
              </span>
            )}
            <button type="submit">Criar</button>
          </form>
        </>
      )}
    </Container>
  );
}
