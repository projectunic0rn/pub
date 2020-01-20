import React, { FC } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 auto;

  &::after {
    content: '';
    flex: 0 0 32%;
  }
`;

/** Displays a list of `Card`s. */
const CardList: FC = ({ children }) => <List>{children}</List>;

export default CardList;
