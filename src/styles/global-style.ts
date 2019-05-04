import { createGlobalStyle } from '@styled-components';

/** Application-wide default styling. */
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'),
        url('/raleway-v13-latin-regular.woff2') format('woff2'),
        url('/raleway-v13-latin-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Raleway';
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local('Raleway Italic'), local('Raleway-Italic'),
        url('/raleway-v13-latin-italic.woff2') format('woff2'),
        url('/raleway-v13-latin-italic.woff') format('woff');
  }

  @font-face {
    font-family: 'Raleway';
    font-display: swap;
    font-style: normal;
    font-weight: 800;
    src: local('Raleway ExtraBold'), local('Raleway-ExtraBold'),
        url('/raleway-v13-latin-800.woff2') format('woff2'),
        url('/raleway-v13-latin-800.woff') format('woff');
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
