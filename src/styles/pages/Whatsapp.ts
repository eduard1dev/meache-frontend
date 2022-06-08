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
    gap: 20px;
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
      cursor: pointer;
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

    margin-top: 26px;

    a {
      text-decoration: none;
      text-align: center;
      border: none;
      font-family: ${({theme}) => theme.fonts.strong};
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
        font-size: 18px;
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
          font-size: 16px;
        }
      }
    }
  }

  .back_icon {
    font-size: 50px;
  }
`;
