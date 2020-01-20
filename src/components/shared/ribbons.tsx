import styled from 'styled-components';

import { theme } from '@styles';

interface RibbonProps {
  type: string;
}

interface RibbonColors {
  [key: string]: string;
}

const ribbonColors: RibbonColors = {
  success: theme.colors.alert.success,
  danger: theme.colors.alert.danger,
};

export const Ribbon = styled.div`
  background: ${(p: RibbonProps) => ribbonColors[p.type]};
  color: white;
  width: 100%;
  height: 35px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px;
  text-align: center;
  font-size: 16px;
  z-index: 99999;
`;

export const CloseButton = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.colors.baseinvert};
  right: 15px;

  :hover {
    cursor: pointer;
  }
`;
