import { Button } from './button';
import styled from 'styled-components';

export const SecondaryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.button.secondary};
  color: ${({ theme }) => theme.colors.base};

  :hover {
    background: ${({ theme }) => theme.colors.button.secondaryHighlight};
  }
`;
