import * as constants from './constants';

const colors = {
  /** Off-black */
  base: constants.blackOff,
  /** Opposite of base. */
  baseinvert: constants.white,
  /** Main color but darker. */
  highlightDark: constants.primaryMedium,
  /** Main color. */
  highlight: constants.primaryLight,
  /** Main color but lighter. */
  highlightLight: constants.primaryLighter,
  /** Medium gray */
  secondary: constants.greyMedium,
  /** Light gray */
  tertiary: constants.greyLight,
  /** Alternate light gray */
  text: constants.greyLightAlt,
  /** Light background for section. */
  section: constants.blueLightAlt,
  /** Alternate color. */
  alternate: constants.greenLight,
  /** Used for box shadows. */
  shadow: constants.shadow,
};

const responsive = {
  large: '70em' as const,
  medium: '50em' as const,
  small: '35em' as const,
};

const sizes = {
  maxWidth: '1050px' as const,
  maxWidthCentered: '650px' as const,
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
    },
  },
};

export interface ThemeInterface {
  colors: typeof colors;
  responsive: typeof responsive;
  sizes: typeof sizes;
  boxes: typeof boxes;
}

export const theme = Object.freeze<ThemeInterface>({
  colors,
  responsive,
  sizes,
  boxes,
});
