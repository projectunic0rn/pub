import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

import * as constants from './constants';
import { borderStyle } from '@utils';

const { roboto, black, preFontSize, codeFontSize } = constants;
const baseColor = constants.blueLight;
const borderWidth = '0.5925rem' as const;
const anchorBgImg = `linear-gradient(to top, ${black}, ${black} 1px, ${baseColor} 1px, ${baseColor} 2px, ${black} 2px)`;
const blockquoteBorder = borderStyle({
  width: borderWidth,
  style: 'solid',
  color: baseColor,
});

oceanBeachTheme.headerFontFamily = [roboto];
oceanBeachTheme.overrideThemeStyles = () => ({
  a: {
    color: baseColor,
    textShadow: 'none',
    backgroundImage: anchorBgImg,
  },
  'a:visited': {
    color: baseColor,
  },
  blockquote: {
    borderLeft: blockquoteBorder,
  },
  code: {
    fontSize: codeFontSize,
  },
  pre: {
    fontSize: preFontSize,
  },
  '@media only screen and (max-width:480px)': {
    blockquote: {
      borderLeft: blockquoteBorder,
    },
  },
});

/** Configuration object for `gatsby-plugin-typography`. */
const typography = new Typography(oceanBeachTheme);

export default typography;
