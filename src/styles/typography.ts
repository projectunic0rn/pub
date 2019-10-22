import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

import { theme } from './theme';
import { borderStyle } from '@utils';

const codeFontSize = '0.9em' as const;
const preFontSize = '1em' as const;
const highlightColor = theme.colors.highlight;
const borderWidth = '0.3125rem' as const;
const blockquoteBorder = borderStyle({
  width: borderWidth,
  style: 'solid',
  color: theme.colors.highlightLight,
});

oceanBeachTheme.headerFontFamily = ['Raleway', 'sans-serif'];
oceanBeachTheme.bodyFontFamily = ['Raleway', 'sans-serif'];
oceanBeachTheme.boldWeight = 800;
oceanBeachTheme.overrideThemeStyles = () => ({
  a: {
    color: highlightColor,
    textShadow: 'none',
    backgroundImage: 'none',
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
