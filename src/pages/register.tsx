import { useState, useReducer, FormEvent, useEffect } from 'react'
import { Container } from '../styles/pages/Register'
import { Input } from '../styles/components/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { api } from '../services/api'

export default function Whatsapp() {
  interface IForm {
    username: string,
    email: string,
    password: string,
  }
  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IForm>()
  const [link, setLink] = useState('')

  const onSubmit: SubmitHandler<IForm> = async ({username, email, password}) => {
    try {
      const response = await api.post('/api/auth/register', {
        username,
        email,
        password
      }, {withCredentials: true})
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <h1>
        Crie sua conta
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username', { required: true })} placeholder='username' />
        <Input {...register('email', { required: true })} placeholder='email' type='email' />
        <Input {...register('password', { required: true })} placeholder='senha' type='password'/>
        <button type='submit'>
          Criar
        </button>
        {link && <a href={link} target="_blank" rel="noopener noreferrer" >{link}</a>}
      </form>
    </Container>
  )
}
