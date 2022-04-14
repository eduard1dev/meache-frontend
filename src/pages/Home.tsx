import Link from 'next/link'
import { useState, useReducer, FormEvent, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container } from '../styles/pages/Home'

export default function Home() {
  const { user } = useContext(AuthContext)

  console.log("test", user)
  return (
    <Container>
      <h1>
        Bem vindo ao seu dashboard
      </h1>
      <p>
        {`sss ${user?.username}`}
      </p>
      <section className='section-buttons'>
          {!user?.hasWhatsappLink && 
            <Link href='/Whatsapp'>
              <button>
                  Crie seu link direto para o whatsapp
              </button>
            </Link>
          }
          <button>
              Crie sua pagina de contato
          </button>
      </section>
    </Container>
  )
}
