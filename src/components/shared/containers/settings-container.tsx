import React, { FC } from 'react';
import styled from 'styled-components';

import { BaseContainer } from './base-container';
import { Ribbon, CloseButton } from '../ribbons';
import { Loader } from '@components/shared';

type SettingsContainerProps = {
  error: string | null | undefined;
  isLoading: boolean;
  setError: Function;
  success: string | null | undefined;
  setSuccess: Function;
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  width: 100%;
  min-height: 50vh;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: 0;
  }
`;

export const SettingsContainer: FC<SettingsContainerProps> = ({
  children,
  error,
  setError,
  isLoading,
  success,
  setSuccess,
}) => {
  return (
    <Wrapper>
      {isLoading && <Loader />}

      {error && (
        <Ribbon type="danger">
          {error}{' '}
          <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}

      {success && (
        <Ribbon type="success">
          {success}{' '}
          <CloseButton onClick={() => setSuccess(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}

      {!isLoading && <BaseContainer hasBorder>{children}</BaseContainer>}
    </Wrapper>
  );
};
