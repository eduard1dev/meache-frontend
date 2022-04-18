import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0 32px 0;
  color: #f0f0f0;

  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.text};
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    padding: 28px;
    border-radius: 6px;
    gap: 20px;
    width: 100%;
    max-width: 400px;
    background-color: ${({ theme }) => theme.colors.grey};

    div {
      display: flex;
      gap: 6px;
      flex-direction: column;
    }

    button {
      height: 58px;
      width: 100%;
      align-self: center;
      margin-bottom: 6px;

      text-decoration: none;
      border-radius: 4px;
      text-align: center;
      background-color: ${({ theme }) => theme.colors.primary};
      border: none;
      outline: none;

      color: ${({ theme }) => theme.colors.background};
      font: ${({ theme }) => theme.fonts.strong};
      font-size: 18px;
      text-transform: uppercase;
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
