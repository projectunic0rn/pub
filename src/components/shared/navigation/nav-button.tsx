import styled from 'styled-components';

import { Button } from '@components/shared/buttons';

const NavButton = styled(Button)`
  background: ${({ theme }) => theme.colors.highlight};

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.highlightDark};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.smallest}) {
    padding: 2px 6px;
  }
`;

export default NavButton;
