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

  h1 {
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

    p {
      font: ${({theme}) => theme.fonts.normal};
    }

    >div {
      width: 100%;
      text-align: left;

      p:nth-of-type(1) {
        font-size: 1.6rem;
        margin: 0;
      }

      p:nth-of-type(2) {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.8rem;
      }
    }
  }

  >div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${({theme}) => theme.colors.grey};
    border-radius: 6px;
    padding: 24px 8px;
    min-width: 300px;

    margin-top: 26px;

    a {
      text-decoration: none;
      text-align: center;
      border: none;
      font: ${({theme}) => theme.fonts.normal};
      font-size: 1.8rem;
      color: #f0f0f0;
      margin-bottom: 28px;
    }

    >div {
      flex-direction: row;
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 14px;

      button {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.8rem;
        text-decoration: none;
        text-align: center;
        justify-content: space-between;
        border-radius: 8px;
        border: none;
        background-color: ${({theme}) => theme.colors.primary};
        color: ${({theme}) => theme.colors.background};
        padding: 8px;
        font: ${(props) => props.theme.fonts.strong};

        >span {
          font-size: 1.6rem;
        }
      }
    }
  }

  .back_icon {
    font-size: 5.0rem;
  }
`;
