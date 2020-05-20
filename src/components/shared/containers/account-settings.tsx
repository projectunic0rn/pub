import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
  useContext,
} from 'react';
import { debounce } from 'lodash';
import * as yup from 'yup';
import { MainContent } from './main-content';
import { SettingsContainer } from './settings-container';
import { Button } from '@components/shared/buttons';
import { AuthContext } from '@contexts';
import { Form } from '../form';
import {
  FormInput,
  ButtonWrapper,
  TechnologiesSelect,
  FormTextArea,
} from '../form/controls';
import { ContainerSidePanel, Image } from '../side-panels';
import { MenuItem } from '../side-panels/container-side-panel';
import { messages } from '../../../const';
import {
  ApiResponse,
  ErrorResponse,
  ServiceResolver,
  User,
  Username,
  UserTechnology,
  UserValidation,
} from '@api';
import { defaultProfileImage } from '@images';
import { hasError, customHandleBlur } from '@utils';
import { ValueType } from 'react-select/src/types';
import styled from 'styled-components';
import { Formik } from 'formik';

interface OptionType {
  label: string;
  value: string;
}

interface FormValues {
  username: string;
  bio: string;
  technologies: UserTechnology[];
}

const UsernameCheck = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

export const AccountSettings: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: true, reason: '' });
  const [technologies, setTechnologies] = useState<UserTechnology[]>([]);
  const authContext = useContext(AuthContext);
  const user = authContext.member;
  const api = ServiceResolver.apiResolver();

  const initialValues: FormValues = {
    username: user ? user.username : '',
    bio: user ? user.bio : '',
    technologies: [],
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required(messages.validation.required),
    bio: yup.string().required(messages.validation.required),
    technologies: yup.array().required(messages.validation.required),
  });

  let focusedElements: string[] = [];

  useEffect(() => {
    if (user && user.technologies) {
      setTechnologies(user.technologies);
      initialValues.username = user.username;
      initialValues.technologies = user.technologies;
    }
  }, [initialValues.technologies, user, initialValues.username]);

  const makeApiCall = async (values: FormValues, setSubmitting: Function) => {
    setSubmitting(true);

    const { username, bio, technologies } = values;

    try {
      const updatedUser: User = {
        ...user,
        username,
        bio,
        technologies,
      };
      const response = (await api.editUser(updatedUser)) as ApiResponse<
        User | ErrorResponse
      >;

      if (response.ok) {
        setSuccess('Settings saved');
      } else {
        // TODO: move to try catch, currently this will never execute.
        setError((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setError(err.message);
    }

    setSubmitting(false);
  };

  const handleUsernamValidation = async (
    username: string,
    currentUser: User | undefined,
  ) => {
    const api = ServiceResolver.apiResolver();
    const u: Username = {
      username,
    };

    if (username === currentUser?.username) {
      setUsernameAvailability({ valid: true, reason: '' });

      return;
    }

    try {
      const response = (await api.validateUsername(u)) as ApiResponse<
        UserValidation | ErrorResponse
      >;
      if (response.ok) {
        setUsernameAvailability(response.data as UserValidation);
      }
    } catch {
      setUsernameAvailability({
        valid: false,
        reason: 'Failed to validate username',
      });
    }
  };

  const debouncedUsernameValidation = useCallback(
    debounce(handleUsernamValidation, 450),
    [],
  );

  const checkUsername = (username: string) => {
    setUsernameAvailability({ valid: true, reason: 'Checking...' });
    debouncedUsernameValidation(username, user);
  };

  const handleSelectChange = (e: ValueType<OptionType>, values: FormValues) => {
    const userId = user?.id ? user.id : '';
    const updatedTechnologies: UserTechnology[] = Array.isArray(e)
      ? e.map((v) => {
          const userTech = technologies.find(
            (t: UserTechnology) => t.name === v,
          );

          return userTech
            ? { name: v, userId, id: userTech.id }
            : { name: v, userId };
        })
      : [];

    setTechnologies(updatedTechnologies);
    values.technologies = updatedTechnologies;
  };

  return (
    <SettingsContainer
      error={error}
      setError={setError}
      success={success}
      setSuccess={setSuccess}
    >
      <ContainerSidePanel>
        <MenuItem>General</MenuItem>
      </ContainerSidePanel>

      <MainContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            makeApiCall(values, setSubmitting);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
            errors,
          }) => (
            <Form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Image
                src={(user && user.profilePictureUrl) || defaultProfileImage}
                width="64"
                height="64"
              />
              <FormInput
                label="Username"
                name="username"
                id="username"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  checkUsername(e.target.value);
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
                hasError={hasError(errors, focusedElements, 'username')}
              />
              <UsernameCheck isValid={usernameAvailablity.valid}>
                {values.username && usernameAvailablity.reason}
              </UsernameCheck>
              <br />
              <br />

              <FormTextArea
                label="Bio"
                name="bio"
                id="bio"
                rows={5}
                value={values.bio}
                onChange={handleChange}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
                hasError={hasError(errors, focusedElements, 'bio')}
              />
              <br />

              {user && user.technologies && (
                <TechnologiesSelect
                  label="Technologies"
                  name="technologies"
                  setError={setError}
                  initialValues={technologies}
                  setTechnologies={(e: ValueType<OptionType>) =>
                    handleSelectChange(e, values)
                  }
                  handleBlur={handleBlur}
                  hasError={hasError(errors, focusedElements, 'technologies')}
                />
              )}

              <ButtonWrapper>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    setSuccess(null);
                    setError(null);

                    focusedElements =
                      Object.keys(errors).length > 0
                        ? [...Object.keys(errors)]
                        : [...Object.keys(values)];
                  }}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </ButtonWrapper>
            </Form>
          )}
        </Formik>
      </MainContent>
    </SettingsContainer>
  );
};
