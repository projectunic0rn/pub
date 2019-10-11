import * as React from 'react';
import styled from '@styled-components';
import { Button } from '@components/app/shared';

const NavMenuButton = styled(Button)`
  background: ${({ theme }) => theme.colors.highlight};

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.highlightDark};
    }
  }
`;

const NavButton: React.FC<{ onClick?: Function }> = ({ onClick, children }) => {
  return (
    <NavMenuButton onClick={(e) => (onClick ? onClick(e) : '')} active={true}>
      {children}
    </NavMenuButton>
  );
};

export default NavButton;
