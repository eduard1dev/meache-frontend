import { useState, useReducer, FormEvent, useEffect } from 'react';
import { Container, LinkButton } from '../styles/pages/Redirect';
import { useRouter } from 'next/router';

interface ILink {
  name: string;
  link: string;
}

interface IForm {
  phone: string;
  message: string;
}

export default function Redirect() {
  const router = useRouter();

  const [links, setLinks] = useState<ILink[]>([
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/neymarjr/'
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/neymarjr/'
    }
  ]);

  return (
    <Container>
      <h1 className="username">toaqui.ee</h1>
      <div>
        {links.map((item) => (
          <LinkButton href={item.link} key={item.link}>
            <p>{item.name}</p>
          </LinkButton>
        ))}
      </div>
    </Container>
  );
}
