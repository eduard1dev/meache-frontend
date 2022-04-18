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
    }
  }

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    padding: 28px;
  }

  .back_icon {
    font-size: 50px;
  }
`;
