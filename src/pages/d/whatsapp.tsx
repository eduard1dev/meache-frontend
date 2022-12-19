import { useContext, useEffect, useMemo } from 'react';
import { Container } from '../../styles/pages/Whatsapp';
import { Input } from '../../styles/components/Input';
import Button from '../../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { CopyFilled } from '@ant-design/icons';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import theme from '../../styles/theme';

import { toast } from 'react-toastify';

export default function Whatsapp() {
  interface IForm {
    phone: string;
    message: string;
  }
  const { user, setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IForm>();

  const whatsappLink = useMemo(
    () => `${process.env.NEXT_PUBLIC_URL}r/${user.userUrl}`,
    [user.userUrl]
  );

  const shareMessage = `Olá! Esse é meu link para o Whatsapp:\n${whatsappLink}`;

  const postWhatsapp = (...args: any[]) =>
    api.post(`/api/whatsapp/${user.id!}`, ...args);
  const postWhatsappApi = useApi(postWhatsapp);

  const onSubmit: SubmitHandler<IForm> = async ({ message, phone }) => {
    try {
      postWhatsappApi
        .request(
          {
            phone,
            message
          },
          { withCredentials: true }
        )
        .then((data) => {
          if (data) {
            setUser({
              ...user,
              hasWhatsappLink: true,
              whatsappLink: data.whatsappLink
            });
          }
        });
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
      //setLoading(false);
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
              <button>
                <CopyFilled style={{ fontSize: 26 }} />
                <span onClick={copyLinkToClipboard}>Copiar</span>
              </button>
              <button>
                <WhatsappShareButton title="Whatsapp" url={shareMessage}>
                  <WhatsappIcon
                    bgStyle={{ fill: theme.colors.primary }}
                    iconFillColor={theme.colors.text_inner}
                    size={32}
                  />
                </WhatsappShareButton>
                <span>Enviar</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Crie seu link direto para o whatsapp</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>seu link:</p>
              <p>{whatsappLink}</p>
            </div>
            <Input
              {...register('phone', { required: true })}
              placeholder="digite o seu numero"
            />
            <Input
              {...register('message', { required: true })}
              placeholder="digite a mensagem"
            />
            <Button
              type="submit"
              loading={postWhatsappApi.loading}
              title="Criar"
            />
          </form>
        </>
      )}
    </Container>
  );
}
