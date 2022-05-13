import { useState, useReducer, FormEvent, useEffect } from 'react';
import { Container } from '../styles/pages/Verify';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';
import ReactLoading from 'react-loading';

export default function Whatsapp() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

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
      {isLoading ? (
        <ReactLoading
          type="spinningBubbles"
          height={100}
          width={100}
          color="#fff"
        />
      ) : (
        <h1>Obrigado por verificar seu email!</h1>
      )}
    </Container>
  );
}
