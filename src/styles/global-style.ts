import { createGlobalStyle } from '@styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  footer {
    width: 100%;
  }

  @media screen and (min-width: 35em) {
    html {
      margin-right: calc(-100vw + 100%);
      overflow-x: hidden;
    }
  }

`;
