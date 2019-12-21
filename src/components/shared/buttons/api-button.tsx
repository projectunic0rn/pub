import React, { SyntheticEvent } from 'react';

import { Button } from './button';
import styled from 'styled-components';

interface ApiButtonProps {
  handleClick: Function;
  statusText: string;
}

export const ApiButtonHtml = styled(Button)``;

export const ApiButton: React.FC<ApiButtonProps> = ({
  children,
  handleClick,
  statusText,
}) => {
  const [requestMade, setRequestMade] = React.useState<boolean>(false);

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
