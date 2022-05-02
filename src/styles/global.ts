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
  }

  main {
    padding-top: 60px;
    height: 100vh;
  }

  /* div {
    display: flex;
  } */
`;
