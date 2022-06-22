import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  padding: 0 32px 0;
  color: ${({ theme }) => theme.colors.text};;

  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.6rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    padding: 28px;
    border-radius: 6px;
    width: 100%;
    max-width: 400px;
    background-color: ${({ theme }) => theme.colors.grey};
    font-size: 1.6rem;

    >div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;

      ${({ theme }) => theme.gap_column(0.6)};
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      margin-left: 1rem;
    }
  }
`;
