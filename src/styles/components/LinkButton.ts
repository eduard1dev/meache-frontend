import styled from 'styled-components';

import { LinkButtonProps } from '../../components/LinkButton';

export const Container = styled.a<LinkButtonProps>`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background-color: ${(props) =>
    props.colorTheme?.secondary ?? props.theme.colors.grey};

  width: 100%;
  max-width: 500px;

  padding: 40px 20px;
  border-radius: 2px;
  margin-top: 20px;
  border: none;

  font: ${(props) => props.theme.fonts.strong};
  font-size: 22px;
  color: ${(props) => props.colorTheme?.primary ?? props.theme.colors.text};

  ${(props) =>
    props.animation && `animation: 3s ease-in infinite ${props.animation}`};

  &:hover {
    transform: scale(1.008);
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
`;
