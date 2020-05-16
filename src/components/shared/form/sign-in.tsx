import { Link, navigate } from 'gatsby';
import React, { FC, useEffect, useState, useContext, FormEvent } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import { Message } from '..';
import { ApiResponse, ErrorResponse, JwtToken } from '@api';
import {
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form/controls';
import { Form } from '@components/shared/form';
import { Button } from '@components/shared/buttons';
import { AuthContext } from '@contexts';
import { useSiteMetadata } from '@hooks';

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

interface SignInFormProps {
  location: {
    state: {
      message: string;
    };
  };
}

interface FormValues {
  email: string;
  password: string;
}

export const SignInForm: FC<SignInFormProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState<string>('');

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (location.state !== null) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const makeApiCall = async (values: FormValues, setSubmitting: Function) => {
    if (!values.email || !values.password) {
      setMessage('Invalid email or password');

      return;
    }

    setSubmitting(true);

    try {
      const { email, password } = values;
      const response = (await authContext.signIn?.({
        email,
        password,
      })) as ApiResponse<JwtToken | ErrorResponse>;

      if (response.ok) {
        navigate('/projects/');
      } else {
        setMessage((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setMessage('Invalid email or password');
    }

    setSubmitting(false);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          makeApiCall(values, setSubmitting);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            heading={`Sign In To ${siteMetadata.title}`}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {message && <Message variant="error" value={message} />}

            <FormInput
              label="Email"
              name="email"
              id="email"
              type="email"
              placeholder="unicorn@projectunicorn.net"
            />

            <FormInput
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="Your Password"
            />

            <LinkWrapper>
              <Link to="/signup">New member? Sign Up!</Link>
            </LinkWrapper>

            <ButtonWrapper>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
