import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font: ${(props) => props.theme.fonts.normal};
    height: 100vh;
    width: 100vw;
  }

  main {
    height: 100vh;
    max-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
     
    >div {
      max-width: 720px;
      flex: 1;
    }
  }

  button {
    cursor: pointer
  }
`;
