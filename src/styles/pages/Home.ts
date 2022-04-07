import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 0 32px 0;
  color: ${props => props.theme.colors.text};

  font: ${props => props.theme.fonts.normal};
  text-align: center;

  h1 {
    margin: 40px 0;
  }

  section.section-buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    button {
      height: 60px;
      width: 100%;

      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      background-color: ${props => props.theme.colors.primary};
      border: none;
      font: ${props => props.theme.fonts.strong};
      font-size: 16px;
    }
  }
`