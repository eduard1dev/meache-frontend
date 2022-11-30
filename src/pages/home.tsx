import Link from 'next/link';
import { useState, useReducer, FormEvent, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Container } from '../styles/pages/Home';
import Button from '../components/Button';

export default function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <></>;

  return (
    <Container>
      <section className="section-edit-buttons">
        <h3>Meus Links</h3>
        <Link href="/redirect/edit">
          <Button title="Página de links" />
        </Link>
        {!!user?.hasWhatsappLink && (
          <Link href="/whatsapp">
            <Button title="Meu link de whatsapp" />
          </Link>
        )}
        <Link href="/userStats">
          <Button title="Veja de onde estão acessando seu link!" />
        </Link>
      </section>

      <section className="section-add-buttons">
        {!user?.hasWhatsappLink && (
          <Link href="/whatsapp">
            <Button title="Crie seu link direto para o whatsapp" />
          </Link>
        )}
        <Button title="Crie sua pagina de contato (em breve...)" />
      </section>
    </Container>
  );
}
