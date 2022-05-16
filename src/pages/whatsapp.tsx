import { useState, useContext, useEffect, useMemo } from 'react';
import { Container } from '../styles/pages/Whatsapp';
import { Input } from '../styles/components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { CopyFilled } from '@ant-design/icons';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

import { toast } from 'react-toastify';
import Loading from 'react-loading';

export default function Whatsapp() {
  interface IForm {
    phone: string;
    message: string;
    userUrl: string;
  }
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IForm>();

  const whatsappLink = useMemo(
    () => `http://${process.env.NEXT_PUBLIC_URL}r/${user.userUrl}`,
    [user.userUrl]
  );

  const shareMessage = `Olá! Esse é meu link para o Whatsapp:\n${whatsappLink}`;

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

  /* const getUserWhatsappLink = async () => {
    const response = await api.get(`api/whatsapp/${user.userUrl}`);
    setWhatsappLink(response.data.whatsappLink);
    setUser((state) => ({
      ...state,
      whatsappLink: response.data.whatsappLink
    }));
  }; */

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(whatsappLink);
    toast('Link copiado!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: 'info'
    });
  };

  useEffect(() => {
    if (!!user && !!user?.hasWhatsappLink) {
      //getUserWhatsappLink();
      setLoading(false);
    }
  }, [user]);

  return (
    <Container>
      {!!user?.hasWhatsappLink ? (
        <>
          <h1>Esse é seu link para o whatsapp</h1>
          <div>
            <a href={whatsappLink}>{whatsappLink}</a>
            <div>
              <div>
                <CopyFilled style={{ fontSize: 26 }} />
                <span onClick={copyLinkToClipboard}>Copiar</span>
              </div>
              <div>
                <WhatsappShareButton title="Whatsapp" url={shareMessage}>
                  <WhatsappIcon
                    bgStyle={{ fill: '#f8c630' }}
                    iconFillColor="#121214"
                    size={32}
                  />
                </WhatsappShareButton>
                <span>Enviar</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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