import React, { FC } from 'react';
import styled from 'styled-components';

export const BaseContainerHtml = styled.div`
  display: flex;
  width: 60%;
  margin: 0 auto 50px auto;
`;

type BaseContainerProps = {
  border?: boolean;
};

export const BaseContainer: FC<BaseContainerProps> = ({ border, children }) => {
  return (
    <BaseContainerHtml style={{ border: `${border && '1px solid lightgray'}` }}>
      {children}
    </BaseContainerHtml>
  );
};
