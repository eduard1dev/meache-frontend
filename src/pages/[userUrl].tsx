import { useState, useReducer, FormEvent, useEffect, useContext } from 'react'
import { LinkButtonProps } from '../components/LinkButton'
import { useRouter } from 'next/router'
import { BlockPicker } from 'react-color'
import LinkButton from '../components/LinkButton'

import { Container } from '../styles/pages/Redirect'
import { AuthContext } from '../contexts/AuthContext'
import { useApi } from '../hooks/useApi'
import { api, getApiClient } from '../services/api'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { parseCookies } from 'nookies'

interface LinkButtonResponse {
  name: string
  link: string
  animation?: 'shake' | 'color'
  colorTheme?: {
    primary: string
    secondary: string
  }
}

export default function Redirect({ userLinks }) {
  const router = useRouter()
  //const { user, isAuthenticated } = useContext(AuthContext);
  //console.log(user);

  const [links, setLinks] = useState<LinkButtonResponse[]>(userLinks)

  const [colorPicked, setColorPicked] = useState('#FFFFFF')

  const { id } = router.query

  return (
    <Container>
      {links.map((item, index) => (
        <LinkButton
          href={item.link}
          key={index.toString()}
          animation={item.animation}
          colorTheme={item.colorTheme}
          name={item.name}
        />
      ))}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let userLinks = null

  const response = await api.get(`/api/user/${ctx.params.userUrl}`)
  userLinks = response.data.userLinks

  return { props: { userLinks }, revalidate: 10 }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return { paths: [], fallback: 'blocking' }
}
