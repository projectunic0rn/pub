declare module '*.jpg';
declare module '*.png';
declare module '*.ico';
declare module '*.svg';
declare module 'gatsby-plugin-mailchimp';
declare module 'react-select/async';
declare module 'lodash';

declare module 'typography-theme-ocean-beach' {
  import { TypographyOptions } from 'typography';

  const Theme: TypographyOptions;

  export = Theme;
}
