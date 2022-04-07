import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0 32px 0;
  color: #f0f0f0;

  font: ${props => props.theme.fonts.normal};
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    gap: 20px;
    width: 100%;

    button {
      height: 40px;
      width: 100%;

      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      background-color: ${props => props.theme.colors.primary};
      border: none;
      font: ${props => props.theme.fonts.strong};
    }
  }
`