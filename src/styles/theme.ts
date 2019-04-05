const colors = {
  /** Off-black */
  base: '#121212',
  /** Light blue */
  highlight: '#5f8ddc',
  /** Medium gray */
  secondary: '#e9e9e9',
  /** Light gray */
  tertiary: '#f3f3f3',
  /** Alternate light gray */
  text: 'rgba(0, 0, 0, 0.73)',
};

const responsive = {
  large: '70em',
  medium: '50em',
  small: '35em',
};

const sizes = {
  maxWidth: '1050px',
  maxWidthCentered: '650px',
};

export interface ThemeInterface {
  colors: typeof colors;
  responsive: typeof responsive;
  sizes: typeof sizes;
}

export const theme: ThemeInterface = {
  colors,
  responsive,
  sizes,
};
