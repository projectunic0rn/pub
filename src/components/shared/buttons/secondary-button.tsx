import styled from 'styled-components';

import { Button } from './button';

export const SecondaryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.button.secondary};
  color: ${({ theme }) => theme.colors.base};

  :hover {
    background: ${({ theme }) => theme.colors.button.secondaryHighlight};
  }
`;
