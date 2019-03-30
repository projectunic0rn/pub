import { createGlobalStyle } from '@styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'),
        url('/roboto-v19-latin-regular.woff2') format('woff2'),
        url('/roboto-v19-latin-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local('Roboto Italic'), local('Roboto-Italic'),
        url('/roboto-v19-latin-italic.woff2') format('woff2'),
        url('/roboto-v19-latin-italic.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto-Bold'),
        url('/roboto-v19-latin-700.woff2') format('woff2'),
        url('/roboto-v19-latin-700.woff') format('woff');
  }

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
