import * as colorNames from './color-names';

const colors = {
  /** Off-black */
  base: colorNames.blackOff,
  /** Opposite of base. */
  baseinvert: colorNames.white,
  /** Main color but darker. */
  highlightDark: colorNames.primaryMedium,
  /** Main color. */
  highlight: colorNames.primaryLight,
  /** Main color but lighter. */
  highlightLight: colorNames.primaryLighter,
  /** Medium gray */
  secondary: colorNames.greyMedium,
  /** Light gray */
  tertiary: colorNames.greyLight,
  /** Alternate light gray */
  text: colorNames.greyLightAlt,
  /** Light background for section. */
  section: colorNames.blueLightAlt,
  /** Alternate color. */
  alternate: colorNames.greenLight,
  /** Used for box shadows. */
  shadow: colorNames.shadow,
  button: {
    /** Button color */
    secondary: colorNames.pinkLight,
    /** Button active color */
    secondaryHighlight: colorNames.pinkMedium,
  },
  alert: {
    danger: colorNames.red,
  },
};

const responsive = {
  large: '70em' as const,
  medium: '50em' as const,
  small: '35em' as const,
};

const sizes = {
  width: {
    max: '1050px' as const,
    maxCentered: '650px' as const,
    medium: '60.9375em' as const,
    small: '41.6875em' as const,
  },
};

const boxes = {
  padding: {
    section: {
      medium: '4.6875em 3.4375em' as const,
      small: '2.8125em 1.5625em' as const,
      smallTop: '1.171875em 3.4375em' as const,
    },
  },
};

export interface ThemeInterface {
  colors: typeof colors;
  responsive: typeof responsive;
  sizes: typeof sizes;
  boxes: typeof boxes;
}

export const theme = {
  colors,
  responsive,
  sizes,
  boxes,
};
