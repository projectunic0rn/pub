import * as React from 'react';
import styled from 'styled-components';
import { Button } from './button';

interface OwnProps {
  onClick?: Function;
  dataTestId: string;
}

const NavMenuButton = styled(Button)`
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

const NavButton: React.FC<OwnProps> = ({ dataTestId, onClick, children }) => {
  return (
    <NavMenuButton
      data-testid={dataTestId}
      onClick={(e: any) => (onClick ? onClick(e) : '')}
    >
      {children}
    </NavMenuButton>
  );
};

export default NavButton;
