import React, { FC } from 'react';
import styled from 'styled-components';

type Item = {
  key: string;
  text: string;
};

type CardTagsProps = {
  items: Item[];
};

type WrapperProps = {
  hasMargin?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  margin-bottom: ${({ hasMargin = false }) => (hasMargin ? '1em' : 0)};
`;

const Pill = styled.div.attrs({ 'data-testid': 'project-card-pill' })`
  background: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.3125em;
  box-shadow: 1px 1px 2px ${({ theme }) => theme.colors.shadow};
  color: ${({ theme }) => theme.colors.text};
  display: inline-block;
  font-size: 0.7em;
  font-weight: 400;
  margin-right: 0.5em;
  padding: 0 0.625em;
  transition: 0.2s;

  &:last-child {
    margin: 0;
  }
`;

const CardTags: FC<CardTagsProps> = ({ items }) => {
  return (
    <Wrapper hasMargin={items.length > 0}>
      {items.slice(0, 5).map(({ key, text }) => (
        <Pill key={key}>{text}</Pill>
      ))}
      {items.length > 5 ? <Pill>+{items.length - 5}</Pill> : null}
    </Wrapper>
  );
};

export default CardTags;
