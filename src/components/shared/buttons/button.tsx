import styled from 'styled-components';

interface ButtonProps {
  right?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.2em;
  padding: 7px 25px;
  border: none;
  transition: 0.15s;
  opacity: ${(props) => (props.disabled ? '0.75' : '1')};
  float: ${(props) => props.right && 'right'};

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.highlightDark};
      cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    }
  }

  :focus {
    border: none;
    outline: none;
  }
`;
