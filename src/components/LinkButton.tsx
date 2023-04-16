import { AnchorHTMLAttributes } from 'react'
import * as S from '../styles/components/LinkButton'
import Image from 'next/image'
import theme from '../styles/theme'

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string
  description?: string
  image?: string
  animation?: 'shake' | 'color'
  colorTheme?: {
    primary: string
    secondary: string
  }
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <S.Container {...props}>
      {!!props?.image && (
        <Image
          src={props.image}
          alt="Image de referência para o link"
          width={280}
          height={80}
        />
      )}
      <p>{props.name}</p>
      <p>{props.description}</p>
    </S.Container>
  )
}
