import { Button } from '@components/app/shared';
import styled from '@styled-components';

const ProjectButton = styled(Button)`
  background: ${({ active, theme }) =>
    active ? theme.colors.button.secondary : theme.colors.highlight};
  position: absolute;
  bottom: 20px;
  right: 20px;
  float: right;

  @media (hover: hover) {
    &:hover {
      background: ${({ active, theme }) =>
        active
          ? theme.colors.button.secondaryHighlight
          : theme.colors.highlightDark};
    }
  }
`;

export default ProjectButton;
