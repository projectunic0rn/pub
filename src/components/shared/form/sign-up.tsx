import { Link, navigate } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form';
import { Form } from '@components/shared/form';
import { useState } from 'react';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { UserValidation } from '@/api/types/user-validation';
import { JwtToken } from '@/api/types/jwt-token';
import { SessionStorageHelper } from '@/helpers';
import { ApiButton } from '../buttons/api-button';
import { ErrorMessage } from '..';
import 'validator';
import validator from 'validator';

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

const Error = styled.ul`
  color: ${({ theme }) => theme.colors.alert.danger};
  margin: 0;

  li {
    margin: 0;
  }
`;

const UsernameCheck = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

interface InputValue {
  val: string;
  required: boolean;
}

interface FormInput {
  [key: string]: InputValue;
}

export const SignUpForm: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const [message, setMessage] = useState<string | UserValidation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: false, reason: '' });

  // TODO: change `any`
  const validationRules: any = {
    email: [
      { rule: () => !validator.isEmpty(email), errorMessage: 'Required' },
      { rule: () => validator.isEmail(email), errorMessage: 'Invalid email' },
    ],
    username: [
      { rule: () => !validator.isEmpty(username), errorMessage: 'Required' },
      // { rule: () => checkUsername(username), errorMessage: 'Username not available' }
    ],
    password: [
      { rule: () => !validator.isEmpty(password), errorMessage: 'Required' },
      // {
      //   rule: () => validator.matches(password, /[a-zA-Z0-9_-\.]{6,}/i),
      //   errorMessage:
      //     'Password must be 6 characters or more, containing only alphanumeric characters, _, -, and .',
      // },
    ],
    confirmPassword: [
      {
        rule: () => !validator.isEmpty(confirmPassword),
        errorMessage: 'Required',
      },
      {
        rule: () => validator.equals(confirmPassword, password),
        errorMessage: 'Passwords do not match',
      },
    ],
  };

  const formErrors: any = React.useState<object>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    const rules = validationRules[name];

    for (const rule of rules) {
      const isValid = rule.rule();

      if (!isValid) formErrors[name] = rule.errorMessage;
      else delete formErrors[name];
    }
  };

  const handleClick = async () => {
    //   const auth = ServiceResolver.authResolver();
    //   const errors = validation.userSignUp(formInputs);
    //   if (errors.length) return setFormErrors([...errors]);
    //   setFormErrors([]);
    //   try {
    //     const locale =
    //       typeof window.navigator !== 'undefined'
    //         ? window.navigator.language
    //         : 'en-US';
    //     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //     const response = (await auth.signUp({
    //       username,
    //       email,
    //       password,
    //       confirmPassword,
    //       locale,
    //       timezone,
    //     })) as ApiResponse<JwtToken | ErrorResponse>;
    //     if (response.ok) {
    //       SessionStorageHelper.storeJwt(response.data as JwtToken);
    //       navigate('/app/projects/');
    //     } else {
    //       setMessage((response.data as ErrorResponse).message);
    //     }
    //   } catch (err) {
    //     setMessage('Failed to sign up. Please try again');
    //   }
  };

  const displayErrorMessages = () => {
    // return formErrors.map((err: string) => {
    //   if (err === 'email') return <li key={err}>Invalid email</li>;
    //   if (err === 'username') return <li key={err}>Invalid username</li>;
    //   if (err === 'password')
    //     return (
    //       <li key={err}>
    //         Password must contain:
    //         <ul>
    //           <li>six characters or more</li>
    //           <li>
    //             has at least one lowercase and one uppercase alphabetical
    //             character
    //           </li>
    //           <li>or has at least one lowercase and one numeric character</li>
    //           <li>or has at least one uppercase and one numeric character</li>
    //         </ul>
    //       </li>
    //     );
    //   if (err === 'confirmPassword')
    //     return <li key={err}>Passwords do not match</li>;
    // });
    return '';
  };

  const checkUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const api = ServiceResolver.apiResolver();
    //   const { name, value } = e.target;
    //   const state = formInputs;
    //   state[name].val = value;
    //   if (value) {
    //     setIsLoading(true);
    //     const username: Username = {
    //       username: value,
    //     };
    //     try {
    //       const response = (await api.validateUsername(username)) as ApiResponse<
    //         UserValidation | ErrorResponse
    //       >;
    //       if (!response.ok) setMessage(response.data as UserValidation);
    //       setIsLoading(false);
    //       setUsernameAvailability(response.data as UserValidation);
    //       setFormInputs({ ...state });
    //     } catch (error) {
    //       setMessage('Failed to validate username');
    //     }
    //   } else {
    //     setUsernameAvailability({ valid: false, reason: '' });
    //   }
  };

  return (
    <Wrapper>
      <Form heading={`Sign Up`}>
        {/* {formErrors && <Error>{displayErrorMessages()}</Error>} */}
        x: {formErrors.hasOwnProperty('email') ? 'true' : 'false'}
        {message && <Error>{message}</Error>}
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          name="email"
          type="email"
          placeholder="unicorn@projectunicorn.net"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => handleBlur(e)}
          hasError={formErrors.hasOwnProperty('email')}
        />
        {formErrors.hasOwnProperty('email') && (
          <ErrorMessage value="Email Required" />
        )}
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput
          name="username"
          type="text"
          placeholder="unicorn21"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={(e) => handleBlur(e)}
          hasError={formErrors.hasOwnProperty('username')}
        />
        <UsernameCheck isValid={usernameAvailablity.valid}>
          {isLoading ? 'checking...' : usernameAvailablity.reason}
        </UsernameCheck>
        {formErrors.hasOwnProperty('username') && (
          <ErrorMessage value="Username Required" />
        )}
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          name="password"
          type="password"
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => handleBlur(e)}
          hasError={
            formErrors.hasOwnProperty('password') ||
            formErrors.hasOwnProperty('confirmPassword')
          }
        />
        {formErrors.hasOwnProperty('password') && (
          <ErrorMessage value="Password Required" />
        )}
        <FormLabel htmlFor="password">Confirm Password</FormLabel>
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Your Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={(e) => handleBlur(e)}
          hasError={
            formErrors.hasOwnProperty('password') ||
            formErrors.hasOwnProperty('confirmPassword')
          }
        />
        {formErrors.hasOwnProperty('confirmPassword') && (
          <ErrorMessage value="Confirm Password Required" />
        )}
        <LinkWrapper>
          <Link to="/signin">Already a member? Sign In</Link>
        </LinkWrapper>
        <ButtonWrapper>
          <ApiButton handleClick={handleClick} statusText="Signing Up...">
            Sign Up
          </ApiButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
