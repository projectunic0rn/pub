import React from 'react';
import { BaseContainer } from './base-container';
import { Loader } from '@components/shared';
import { Ribbon, CloseButton } from '..';
import { Wrapper } from '../page';

interface SettingsContainerProps {
  error: string | null | undefined;
  isLoading: boolean;
  setError: Function;
  success: string | null | undefined;
  setSuccess: Function;
}

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
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

      {!isLoading && <BaseContainer border={true}>{children}</BaseContainer>}
    </Wrapper>
  );
};
