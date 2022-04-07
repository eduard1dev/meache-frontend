import { useState, useReducer, FormEvent, useEffect } from 'react'
import { Container } from '../styles/pages/Whatsapp'
import { useRouter } from 'next/router'
import { api } from '../services/api'
import ReactLoading from 'react-loading';

export default function Whatsapp() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)

  const { id } = router.query

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.put(`/api/auth/verify/${id}`)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    if (id) verify()
  }, [id])

  return (
    <Container>
      {isLoading ? 
        <ReactLoading type='spinningBubbles' height={50} width={50} color='#fff' /> : 
        <h1>Obrigado por verificar seu email!</h1>
      }
    </Container>
  )
}
