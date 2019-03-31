const colors = {
  base: '#121212', // Off-black
  highlight: '#5f8ddc', // Light Blue
  secondary: '#e9e9e9', // Medium Gray
  tertiary: '#f3f3f3', // Light Gray
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
