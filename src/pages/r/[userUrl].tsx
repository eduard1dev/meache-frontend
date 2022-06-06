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
          window.open(
            'https://api.whatsapp.com/send?phone=5579999997788&text=Hi',
            '_blank'
          );
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    //if (userUrl) getLink();
  }, [userUrl]);

  return (
    <Container>
      <h1 className="username">toaqui.ee</h1>
      <a href="intent://send/5579999997788#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end">
        Open WhatsApp chat window
      </a>
      <ReactLoading
        type="spinningBubbles"
        height={50}
        width={50}
        color="#fff"
      />
    </Container>
  );
}
