import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  height: 5rem;
  width: 100%;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  border-radius: 8px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  outline: none;

  color: ${({ theme }) => theme.colors.text_inner};
  font: ${({ theme }) => theme.fonts.strong};
  font-size: 1.8rem;

  opacity: ${({ disabled }) => (!disabled ? 1 : 0.5)};
  cursor: ${({ disabled }) => (!disabled ? 'cursor' : 'not-allowed')};
`;
