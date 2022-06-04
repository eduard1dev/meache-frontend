import { useState, useEffect } from 'react';
import { Container } from '../../styles/pages/Redirect';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import ReactLoading from 'react-loading';

export default function Redirect() {
  const router = useRouter();

  const { userUrl } = router.query;

  useEffect(() => {
    const getLink = async () => {
      try {
        /* const { data }: { data: { whatsappLink: URL } } = await api.get(
          `/api/whatsapp/${userUrl}`
        ); */
        setInterval(() => {
          window.location.replace(
            'whatsapp://send?phone=5579999997788&text=Olá,funcionou ssskkkkk kkk"'
          );
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    if (userUrl) getLink();
  }, [userUrl]);

  return (
    <Container>
      <h1 className="username">toaqui.ee</h1>
      <ReactLoading
        type="spinningBubbles"
        height={50}
        width={50}
        color="#fff"
      />
    </Container>
  );
}
