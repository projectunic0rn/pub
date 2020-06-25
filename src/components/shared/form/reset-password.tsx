import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import { ApiButton } from '../buttons/api-button';
import { ServiceResolver, ResetPassword } from '@api';
import {
  FormLabel,
  FormInput,
  ButtonWrapper,
} from '@components/shared/form/controls';
import { Form } from '@components/shared/form';
import { navigate } from 'gatsby';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};

  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

// TODO: Consider pulling FormMessage into Form since reporting
// a message to user is common accross all app forms.
const FormMessage = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

interface ResetPasswordFormProps {
  token: string | null;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [formValid, setFormValid] = useState(true);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    if (props.token === null || props.token === '') {
      setFormValid(false);
      setFormMessage("Missing required 'token' query parameter.");
    }
  }, [props.token]);

  const handleClick = async () => {
    if (props.token === null) {
      return;
    }

    if (newPassword === '' || confirmNewPassword === '') {
      setFormValid(false);
      setFormMessage('Both password fields required.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFormValid(false);
      setFormMessage('Password fields must match.');
      return;
    }

    const auth = ServiceResolver.authResolver();
    const passwordReset: ResetPassword = {
      newPassword,
      confirmNewPassword,
      validationToken: props.token,
    };

    try {
      await auth.resetPassword(passwordReset);
      setFormMessage('Password reset. Redirecting to login.');
      navigate('/signin');
    } catch (err) {
      setFormValid(false);
      setFormMessage(err.message);
    }
  };

  return (
    <Wrapper>
      <Form heading="Reset Password" subheading="Enter your new password.">
        <FormLabel htmlFor="new-password">New Password</FormLabel>
        <FormInput
          name="new-password"
          id="new-password"
          type="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
            setFormValid(true);
            setFormMessage('');
          }}
        />

        <FormLabel htmlFor="confirm-new-password">
          Confirm New Password
        </FormLabel>
        <FormInput
          name="confirm-new-password"
          id="confirm-new-password"
          type="password"
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
            setFormValid(true);
            setFormMessage('');
          }}
        />

        {formMessage !== '' && (
          <FormMessage isValid={formValid}>{formMessage}</FormMessage>
        )}

        <ButtonWrapper>
          <ApiButton handleClick={handleClick} statusText="Resetting...">
            Reset
          </ApiButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
