import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

import { purpleLight, preFontSize, codeFontSize } from './constants';
import { borderStyle } from '@utils';

const highlightColor = purpleLight;
const transparentColor = 'hsla(0, 0%, 0%, 0)' as const;
const borderWidth = '0.5925rem' as const;
const anchorBgImg = `linear-gradient(to top, ${transparentColor}, ${transparentColor} 1px, ${highlightColor} 1px, ${highlightColor} 2px, ${transparentColor} 2px)`;
const blockquoteBorder = borderStyle({
  width: borderWidth,
  style: 'solid',
  color: highlightColor,
});

oceanBeachTheme.headerFontFamily = ['Raleway', 'sans-serif'];
oceanBeachTheme.bodyFontFamily = ['Raleway', 'sans-serif'];
oceanBeachTheme.boldWeight = 800;
oceanBeachTheme.overrideThemeStyles = () => ({
  a: {
    color: highlightColor,
    textShadow: 'none',
    backgroundImage: anchorBgImg,
  },
  'a:visited': {
    color: highlightColor,
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
