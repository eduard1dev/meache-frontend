import { useState } from 'react'
import { useRouter } from 'next/router'
import { BlockPicker } from 'react-color'
import LinkButton from '../components/LinkButton'

import { Container } from '../styles/pages/Redirect'
import { api } from '../services/api'
import { GetStaticPaths, GetStaticProps } from 'next'

interface LinkButtonResponse {
  name: string
  description?: string
  link: string
  animation?: 'shake' | 'color'
  image?: string
  colorTheme?: {
    primary: string
    secondary: string
  }
}

export default function Redirect({ userLinks }) {
  const [links, setLinks] = useState<LinkButtonResponse[]>(userLinks)

  const [colorPicked, setColorPicked] = useState('#FFFFFF')

  return (
    <Container>
      {links.map((item, index) => (
        <LinkButton
          href={item.link}
          key={index.toString()}
          animation={item.animation}
          colorTheme={item.colorTheme}
          name={item.name}
          description={item.description}
          image={item.image}
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
