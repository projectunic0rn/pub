import React, { FC, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';

import { Button } from './button';

interface ApiButtonProps {
  handleClick: Function;
  statusText: string;
}

export const ApiButtonHtml = styled(Button)``;

export const ApiButton: FC<ApiButtonProps> = ({
  children,
  handleClick,
  statusText,
}) => {
  const [requestMade, setRequestMade] = useState<boolean>(false);

  const handleButtonClick = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!requestMade) {
      setRequestMade(true);
      await handleClick();
      setRequestMade(false);
    }
  };

  return (
    <ApiButtonHtml onClick={handleButtonClick} disabled={requestMade}>
      {requestMade ? statusText : children}
    </ApiButtonHtml>
  );
};
