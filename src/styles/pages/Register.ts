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

  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 3.2rem;
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
      font-size: 1.8rem;
      text-transform: uppercase;
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
    }

    span {
      display: flex;
      font-size: 1.4rem;
      text-align: left;
    }
  }
`;
