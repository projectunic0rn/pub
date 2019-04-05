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
  text: constants.altlightgray,
};

const responsive = {
  large: '70em' as const,
  medium: '50em' as const,
  small: '35em' as const,
};

const sizes = {
  maxWidth: '1050px' as const,
  maxWidthCentered: '650px' as const,
};

export interface ThemeInterface {
  colors: typeof colors;
  responsive: typeof responsive;
  sizes: typeof sizes;
}

export const theme = Object.freeze<ThemeInterface>({
  colors,
  responsive,
  sizes,
});
