import * as React from 'react';

import styled from '@styled-components';

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

const CardList: React.FC = ({ children }) => <List>{children}</List>;

export default CardList;
