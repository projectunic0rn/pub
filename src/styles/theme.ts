import * as constants from './constants';

const colors = {
  /** Off-black */
  base: constants.offblack,
  /** Light blue */
  highlight: constants.lightblue,
  /** Medium gray */
  secondary: constants.mediumgray,
  /** Light gray */
  tertiary: constants.lightgray,
  /** Alternate light gray */
  text: constants.lightgrayalt,
  /** Light background for section. */
  section: constants.lightbluealt,
  /** Alternate color. */
  alternate: constants.lightgreen,
};

const responsive = {
  large: '70em' as const,
  medium: '50em' as const,
  small: '35em' as const,
};

const sizes = {
  maxWidth: '1050px' as const,
  maxWidthCentered: '650px' as const,
  mediumWidth: '60.9375em' as const,
  smallWidth: '41.6875em' as const,
  width: {
    max: '1050px' as const,
    maxCentered: '650px' as const,
    medium: '60.9375em' as const,
    small: '41.6875em' as const,
  },
};

const boxes = {
  padding: {
    section: { medium: '75px 55px' as const, small: '45px 25px' as const },
  },
  sectionPadding: '75px 55px' as const,
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
