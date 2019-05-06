import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

import { purpleLight, purpleLighter, transparent } from './constants';
import { borderStyle } from '@utils';

const codeFontSize = '0.9em' as const;
const preFontSize = '1em' as const;
const highlightColor = purpleLight;
const highlightColorLighter = purpleLighter;
const borderWidth = '0.3125rem' as const;
const anchorBgImg = `linear-gradient(to top, ${transparent}, ${transparent} 1px, ${highlightColor} 1px, ${highlightColor} 2px, ${transparent} 2px)`;
const blockquoteBorder = borderStyle({
  width: borderWidth,
  style: 'solid',
  color: highlightColorLighter,
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
