import { useState, useReducer, FormEvent, useEffect } from 'react';
import { Container } from '../../styles/pages/Verify';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import ReactLoading from 'react-loading';
import theme from '../../styles/theme';

export default function Whatsapp() {
  const router = useRouter();

  const { id } = router.query;

  const putVerifyUser = () => api.put(`/api/auth/verify/${id}`);
  const putVerifyUserApi = useApi(putVerifyUser);

  useEffect(() => {
    const verify = () => {
      putVerifyUserApi.request();
    };
    if (id) verify();
  }, [id]);

  return (
    <Container>
      {putVerifyUserApi.loading || !id || putVerifyUserApi.error ? (
        <ReactLoading
          type="spinningBubbles"
          height={100}
          width={100}
          color={theme.colors.text}
        />
      ) : (
        <h1>Obrigado por verificar seu email!</h1>
      )}
    </Container>
  );
}
