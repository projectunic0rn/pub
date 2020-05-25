import React, { FC, useState } from 'react';
import {
  Form,
  FormLabel,
  FormInput,
  ButtonWrapper,
} from '@components/shared/form';
import { ApiButton } from '@components/shared/buttons';
import { ServiceResolver, ChangePassword, ApiResponse } from '@api';
import { ContentProps } from './menu-items';
import styled from 'styled-components';

const FormMessage = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

export const ChangePasswordContent: FC<ContentProps> = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
  const [formValid, setFormValid] = useState(true);
  const [formMessage, setFormMessage] = useState('');

  const handleCurrentPasswordChange = (password: string) => {
    setOldPassword(password);
  };

  const handleNewPasswordChange = (password: string) => {
    setNewPassword(password);
  };

  const handleConfirmNewPasswordChange = (password: string) => {
    setConfirmedNewPassword(password);
  };

  const handleClick = async () => {
    if (
      oldPassword === '' ||
      newPassword === '' ||
      confirmedNewPassword === ''
    ) {
      setFormMessage('Provide a value for all fields.');
      setFormValid(false);
      return;
    }

    if (newPassword !== confirmedNewPassword) {
      setFormMessage("New passwords don't match.");
      setFormValid(false);
      return;
    }

    const api = ServiceResolver.apiResolver();

    try {
      const changePassword: ChangePassword = {
        oldPassword,
        newPassword,
        confirmedNewPassword,
      };

      (await api.changePassword(changePassword)) as ApiResponse<ChangePassword>;

      setOldPassword('');
      setNewPassword('');
      setConfirmedNewPassword('');
      if (props.handleStatusDisplay) {
        props.handleStatusDisplay('success', 'Password updated.');
      }
    } catch (err) {
      if (props.handleStatusDisplay) {
        props.handleStatusDisplay('error', err.message);
      }
    }
  };

  return (
    <Form>
      <FormLabel htmlFor="old-password">Old Password</FormLabel>
      <FormInput
        type="password"
        name="old-password"
        id="old-password"
        value={oldPassword}
        onChange={(e) => handleCurrentPasswordChange(e.target.value)}
        hasError={false}
        required={true}
        alt="password-field"
      />
      <br />
      <FormLabel htmlFor="new-password">New Password</FormLabel>
      <FormInput
        type="password"
        name="new-password"
        id="new-password"
        value={newPassword}
        onChange={(e) => handleNewPasswordChange(e.target.value)}
        hasError={false}
        required={true}
        alt="password-field"
      />
      <br />
      <FormLabel htmlFor="confirmed-new-password">
        Confirm New Password
      </FormLabel>
      <FormInput
        type="password"
        name="confirmed-new-password"
        id="confirmed-new-password"
        value={confirmedNewPassword}
        onChange={(e) => handleConfirmNewPasswordChange(e.target.value)}
        hasError={false}
        required={true}
        alt="password-field"
      />
      <br />
      {formMessage !== '' && (
        <FormMessage isValid={formValid}>{formMessage}</FormMessage>
      )}
      <ButtonWrapper>
        <ApiButton handleClick={handleClick} statusText="Saving">
          Save
        </ApiButton>
      </ButtonWrapper>
    </Form>
  );
};
