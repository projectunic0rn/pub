import { Button } from './button';
import styled from 'styled-components';

export const FeedbackButton = styled(Button)`
  background: #e3e3e3;
  color: black;
  position: absolute;
  right: 75px;
  top: 140px;
  box-shadow: 0 0 3px gray;

  &:hover {
    background: ${({ theme }) => theme.colors.greyDark};
  }
`;
