declare module '*.jpg';
declare module '*.png';
declare module '*.ico';
declare module '*.svg';

declare module 'typography-theme-funston' {
  import { TypographyOptions } from 'typography';

  const Theme: TypographyOptions;

  export = Theme;
}
