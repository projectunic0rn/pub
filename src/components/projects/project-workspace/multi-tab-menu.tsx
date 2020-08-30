import React, { FC } from 'react';

interface MultiTabMenuProps {
  content?: string;
}

export const MultiTabMenu: FC<MultiTabMenuProps> = (props) => {
  return <div>{props.content || 'MultiTabMenu'}</div>;
};
