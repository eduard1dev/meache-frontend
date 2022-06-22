import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  padding: 0 32px 0;
  color: #f0f0f0;

  font: ${(props) => props.theme.fonts.normal};
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    padding: 28px;
    border-radius: 6px;
    ${({theme}) => theme.gap_column(2)}
    width: 100%;
    max-width: 400px;
    background-color: ${({ theme }) => theme.colors.grey};

    button {
      height: 40px;
      width: 100%;

      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      background-color: ${(props) => props.theme.colors.primary};
      border: none;
      font: ${(props) => props.theme.fonts.strong};
    }
  }
`;
