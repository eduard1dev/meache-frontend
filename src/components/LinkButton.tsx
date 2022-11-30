import { AnchorHTMLAttributes } from 'react';
import * as S from '../styles/components/LinkButton';
import theme from '../styles/theme';

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  animation?: 'shake' | 'color';
  colorTheme?: {
    primary: string;
    secondary: string;
  };
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <S.Container {...props}>
      <p>{props.name}</p>
    </S.Container>
  );
}
