import { useState, useEffect } from 'react';
import { Container } from '../../styles/pages/Redirect';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import ReactLoading from 'react-loading';
import theme from '../../styles/theme';

export default function Redirect() {
  const router = useRouter();

  const { userUrl } = router.query;

  const getLink = (...args: any[]) =>
    api.get(`/api/whatsapp/${userUrl}`, ...args);
  const getLinkApi = useApi(getLink);

  useEffect(() => {
    if (userUrl)
      getLinkApi.request().then((data) => {
        if (data) {
          setTimeout(() => {
            window.location.replace(data.whatsappLink);
          }, 3000);
        }
      });
  }, [userUrl]);

  return (
    <Container>
      <h1 className="username">Estamos te redirecionando...</h1>
      <ReactLoading
        type="spinningBubbles"
        height={50}
        width={50}
        color={theme.colors.text}
      />
    </Container>
  );
}
