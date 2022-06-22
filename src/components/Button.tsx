import * as S from '../styles/components/Button';
import ReactLoading from 'react-loading';
import { ButtonHTMLAttributes } from 'react';
import theme from '../styles/theme';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
}

export default function Button({ loading, title, ...rest }: IButton) {
  return (
    <S.Button {...rest}>
      {loading ? (
        <>
          <ReactLoading
            type="spin"
            height={30}
            width={30}
            color={theme.colors.text_inner}
          />
        </>
      ) : (
        title
      )}
    </S.Button>
  );
}
