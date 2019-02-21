import { createGlobalStyle } from '@styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  .siteRoot {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .siteContent {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
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
