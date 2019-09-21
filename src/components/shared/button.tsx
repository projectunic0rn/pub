import * as React from 'react';
import styled from '@styled-components';

interface ButtonProps {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  background: ${({ active, theme }) =>
    active ? theme.colors.button.secondary : theme.colors.highlight};
  color: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.2em;
  padding: 3px 25px;
  border: none;
  transition: 0.15s;
  @media (hover: hover) {
    &:hover {
      background: ${({ active, theme }) =>
        active ? theme.colors.button.secondary : theme.colors.highlightDark};
      cursor: pointer;
    }
  }
  :focus {
    border: none;
    outline: none;
  }
`;

export default Button;
