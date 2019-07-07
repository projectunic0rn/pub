import * as React from 'react';
import styled from '@styled-components';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.highlightDark};
  border-radius: 0.3125em;
  font-size: 0.7em;
  display: inline-block;
  padding: 0.2em 0.625em;
  margin-right: 0.5em;
  font-weight: 400;
  position: relative;
  cursor: pointer;
  transition: 0.2s;

  &:last-child {
    margin: 0;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0.3125em;
    border: 0.0625em solid ${({ theme }) => theme.colors.highlightDark};
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.baseinvert};
      background: ${({ theme }) => theme.colors.highlightDark};
    }
  }
`;

const CardPill: React.FC = ({ children }) => <Wrapper>{children}</Wrapper>;

export default CardPill;
