import styled from 'styled-components';

interface IInput {
  hasError?: boolean;
}

export const Input = styled.input<IInput>`
  height: 52px;
  width: 100%;
  padding-left: 10px;

  text-decoration: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme, hasError }) => hasError ? theme.colors.error : theme.colors.background};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  outline: 0px;

  transition: border 0.2s ease 0s;

  font: ${({ theme }) => theme.fonts.normal};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};
`;
