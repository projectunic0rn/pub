import { createGlobalStyle } from 'styled-components';
import { slickSliderStyle } from './slick-slider-style';

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

  /**
   * Only display content to screen readers.
   *
   * See:
   *   - https://a11yproject.com/posts/how-to-hide-content/
   *   - https://hugogiraudel.com/2016/10/13/css-hide-and-seek/
   */
  .visually-hidden {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 0.0625rem;
    margin: -0.0625rem;
    overflow: hidden;
    position: absolute;
    padding: 0;
    white-space: nowrap;
    width: 0.0625rem;
  }

  .heading-anchor,
  .gatsby-resp-image-link {
    background:none;
  }

  ${slickSliderStyle};
`;
