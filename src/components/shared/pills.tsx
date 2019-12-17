import React from 'react';
import styled from 'styled-components';

const CardPillWrapper = styled.div`
  color: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.3125em;
  font-size: 0.7em;
  display: inline-block;
  padding: 0.2em 0.625em;
  margin-right: 0.5em;
  font-weight: 400;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  background: #3f3d56;

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
  }

  &:hover {
    cursor: default;
  }

  @media (hover: hover) {
    &:hover {
    }
  }

  @media screen and (max-width: 480px) {
    margin-top: 5px;
  }
`;

interface CardPillProps {
  title?: string;
}

export const CardPill: React.FC<CardPillProps> = ({ children, title }) => (
  <CardPillWrapper title={title}>{children}</CardPillWrapper>
);

export const TechPill = styled.span`
  background: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.3125em;
  font-size: 0.7em;
  display: inline-block;
  padding: 0.4em 1.25em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;

  :hover {
    cursor: default;
  }

  @media screen and (max-width: 480px) {
    margin-top: 5px;
  }
`;
