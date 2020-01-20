import styled from 'styled-components';

import { ApiButton } from './api-button';

interface ProjectButtonProps {
  joined: boolean;
}

export const ProjectButton = styled(ApiButton)<ProjectButtonProps>`
  background: ${({ joined, theme }) =>
    joined ? theme.colors.button.secondary : theme.colors.highlight};
  position: absolute;
  bottom: 30px;
  right: 30px;
  float: right;

  @media (hover: hover) {
    &:hover {
      background: ${({ joined, theme }) =>
        joined
          ? theme.colors.button.secondaryHighlight
          : theme.colors.highlightDark};
    }
  }
`;
