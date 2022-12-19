import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font: ${(props) => props.theme.fonts.normal};
    height: 100%;
    width: 100vw;
  }

  main {
    height: 100%;
    max-width: 100vw;

    > div {
      margin: 0 auto;
      width: 100%;
      max-width: 1080px;
    }
  }

  button, a {
    text-decoration: none;
    cursor: pointer
  }

  .Toastify__toast {
    font-size: 1.6rem
  }
`;
