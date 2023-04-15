import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import * as S from '../styles/pages/Login'
import { Input } from '../styles/components/Input'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { getApiClient } from '../services/api'
import { parseCookies } from 'nookies'
import Button from '../components/Button'
import Link from 'next/link'

export default function Whatsapp() {
  interface IForm {
    username: string
    password: string
  }
  const router = useRouter()
  const { postLoginApi, signIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>()
  const [link, setLink] = useState('')

  return (
    <S.Container>
      <aside>
        <S.MotionDiv
          animate={{
            opacity: [0, 1, 1],
            y: ['40vw', '2vw', '0vw']
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            times: [0, 0.3, 1]
          }}
        >
          <h1>
            Deixe que te achem em todas
            <br /> as suas mídias sociais.
          </h1>

          <h2>Crie uma página de links personalizados.</h2>
        </S.MotionDiv>
      </aside>
      <aside>
        <h1>Acesse sua conta</h1>
        <form onSubmit={handleSubmit(signIn)}>
          <div>
            <Input
              {...register('username', { required: true })}
              placeholder="Usuário"
            />
            <Input
              {...register('password', { required: true })}
              placeholder="Senha"
              type={'password'}
            />
          </div>
          <div>
            <Button loading={postLoginApi.loading} title="Entrar" />
            <p>
              Não tem uma conta?
              <Link href={'/register'}>Registre-se</Link>
            </p>
          </div>
        </form>
      </aside>
    </S.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/d/home',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
