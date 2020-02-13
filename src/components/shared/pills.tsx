import React, { FC } from 'react';
import styled from 'styled-components';

const CardUsernamePillWrapper = styled.div`
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

interface CardUsernamePillProps {
  title?: string;
}

export const CardUsernamePill: FC<CardUsernamePillProps> = ({
  children,
  title,
}) => (
  <CardUsernamePillWrapper title={title}>{children}</CardUsernamePillWrapper>
);

const TechPill = styled.span`
  border-radius: 0.3125em;
  font-size: 0.7em;
  display: inline-block;
  margin-right: 0.5em;
  margin-bottom: 0.5em;

  :hover {
    cursor: default;
  }

  @media screen and (max-width: 480px) {
    margin-top: 5px;
  }
`;

export const CardTechPill = styled(TechPill)`
  background: ${({ theme }) => theme.colors.baseinvert};
  color: ${({ theme }) => theme.colors.base};
  padding: 0.2em 0.625em;
`;

export const ProfileTechPill = styled(TechPill)`
  background: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.baseinvert};
  padding: 0.4em 1.25em;
`;
