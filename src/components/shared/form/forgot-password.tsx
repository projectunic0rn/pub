import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { ApiButton } from '../buttons/api-button';
import { ServiceResolver, ResetPasswordRequest } from '@api';
import {
  FormLabel,
  FormInput,
  ButtonWrapper,
} from '@components/shared/form/controls';
import { Form } from '@components/shared/form';

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

export const ForgotPasswordForm: FC = () => {
  const [email, setEmail] = useState('');
  const [formValid, setFormValid] = useState(true);
  const [formMessage, setFormMessage] = useState('');

  const validEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleClick = async () => {
    if (email === '') {
      setFormValid(false);
      setFormMessage('Email is required.');
      return;
    }

    if (!validEmail(email)) {
      setFormValid(false);
      setFormMessage('Enter valid email.');
      return;
    }

    const auth = ServiceResolver.authResolver();
    const passwordReset: ResetPasswordRequest = {
      email,
    };
    try {
      await auth.resetPasswordRequest(passwordReset);
      setFormMessage('Check your email for the password reset link.');
    } catch (err) {
      setFormValid(false);
      setFormMessage(err.message);
    }
  };

  return (
    <Wrapper>
      <Form
        heading={`Forgot password, No Worries.`}
        subheading={`Enter the email you registered with.`}
      >
        <FormLabel htmlFor="forgot-password-email">Email</FormLabel>
        <FormInput
          name="forgot-password-email"
          id="forgot-password-email"
          type="email"
          placeholder="unicorn@projectunicorn.net"
          onChange={(e) => {
            setEmail(e.target.value);
            setFormValid(true);
            setFormMessage('');
          }}
        />

        {formMessage !== '' && (
          <FormMessage isValid={formValid}>{formMessage}</FormMessage>
        )}

        <ButtonWrapper>
          <ApiButton handleClick={handleClick} statusText="Submitting...">
            Submit
          </ApiButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
