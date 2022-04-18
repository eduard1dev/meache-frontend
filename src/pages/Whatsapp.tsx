import { useState, useContext, useEffect } from 'react';
import { Container } from '../styles/pages/Whatsapp';
import { Input } from '../styles/components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { LeftCircleFilled } from '@ant-design/icons';

export default function Whatsapp() {
  interface IForm {
    phone: string;
    message: string;
    userUrl: string;
  }
  const router = useRouter();
  const { user } = useContext(AuthContext);
  console.log('test', user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IForm>();
  const [whatsappLink, setWhatsappLink] = useState('');

  const onSubmit: SubmitHandler<IForm> = async ({
    message,
    phone,
    userUrl
  }) => {
    try {
      const response = await api.post(
        `/api/whatsapp/${user.id!}`,
        {
          phone,
          message,
          userUrl
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUserWhatsappLink = async () => {
      const response = await api.get(`api/whatsapp/${user?.id}`);
      setWhatsappLink(response.data.whatsappLink);
    };

    if (user) {
      getUserWhatsappLink();
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container>
      {!!user?.hasWhatsappLink ? (
        <div>
          <h1>Esse é seu link para o whatsapp</h1>
          <a href={whatsappLink}>{whatsappLink}</a>
        </div>
      ) : (
        <>
          <div>
            <LeftCircleFilled className="back_icon" onClick={handleGoBack} />
          </div>
          <h1>Crie seu link direto para o whatsapp</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('userUrl', { required: true })}
              placeholder="digite a sua url"
            />
            <Input
              {...register('phone', { required: true })}
              placeholder="digite o seu numero"
            />
            <Input
              {...register('message', { required: true })}
              placeholder="digite a mensagem"
            />
            <button type="submit">Criar</button>
          </form>
        </>
      )}
    </Container>
  );
}
