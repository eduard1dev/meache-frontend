import styled from 'styled-components'

import { LinkButtonProps } from '../../components/LinkButton'

export const Container = styled.a<LinkButtonProps>`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  padding: 2rem;
  width: 100%;
  margin-top: 20px;
  border: none;

  align-items: center;

  font: ${(props) => props.theme.fonts.strong};
  font-size: 22px;
  color: ${(props) => props.colorTheme?.primary ?? props.theme.colors.text};

  ${(props) =>
    props.animation && `animation: 3s ease-in infinite ${props.animation}`};

  &:hover {
    transform: scale(1.008);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  @keyframes shake {
    5% {
      transform: rotate(3deg);
    }
    10% {
      transform: rotate(-3deg);
    }
    15% {
      transform: rotate(0deg);
    }
  }

  @keyframes color {
    0% {
      background: #f5f5f5;
    }
    50% {
      background: #adafaf;
    }
    100% {
      background: #f5f5f5;
    }
  }

  img {
    border-radius: 0.5rem;
    margin-right: 4rem;
  }
`
