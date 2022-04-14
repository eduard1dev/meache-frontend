import { useState, useReducer, FormEvent, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Container } from '../styles/pages/Login'
import { Input } from '../styles/components/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { api } from '../services/api'
import { setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify'

export default function Whatsapp() {
  interface IForm {
    username: string,
    password: string,
  }
  const router = useRouter()
  const { setUser, user, isAuthenticated } = useContext(AuthContext);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IForm>()
  const [link, setLink] = useState('')


  const onSubmit: SubmitHandler<IForm> = async ({username, password}) => {
    try {
      const response = await api.post('/api/auth/login', {
        username,
        password
      }, {withCredentials: true})

      const token = response.data.accessToken

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })
  
      api.defaults.headers['token'] = '';
      api.defaults.headers['token'] = `Bearer ${token}`;

      setUser(response.data)
  
      router.push('/Home');
    } catch (error) {
      console.log(error.response.data)
      toast(error.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error'
      })
    }
  }

  return (
    <Container>
      <h1>
        Acesse sua conta
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input {...register('username', { required: true })} placeholder='Usuário' />
          <Input {...register('password', { required: true })} placeholder='Senha' type={'password'} />
        </div>
        <div>
          <button type='submit'>
            Entrar
          </button>
          <p>
            Não tem uma conta? <a onClick={() => router.push('/register')}>Registre-se</a>
          </p>
        </div>
      </form>
    </Container>
  )
}

