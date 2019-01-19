import * as styledComponents from 'styled-components';
// tslint:disable-next-line: no-duplicate-imports
import { ThemedStyledComponentsModule } from 'styled-components';

import { ThemeInterface } from '@styles';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
