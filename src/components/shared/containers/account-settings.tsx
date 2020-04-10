import React, { FC, useEffect, useState } from 'react';
import { MenuItem } from '../side-panels/container-side-panel';
import { MainContent } from './main-content';
import DefaultImage from '@images/default.png';
import { ContainerSidePanel, Image } from '../side-panels';
import {
  FormLabel,
  FormInput,
  FormTextArea,
  ButtonWrapper,
  TechnologiesSelect,
} from '../form/controls';
import { Form } from '../form';
import { ApiButton } from '../buttons';
import { ServiceResolver } from '@api';
import { UserAuthHelper } from '@helpers';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { User, UserTechnology } from '@/api/types';
import { SettingsContainer } from './settings-container';

export const AccountSettings: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [technologies, setTechnologies] = useState<UserTechnology[]>();

  useEffect(() => {
    const api = ServiceResolver.apiResolver();

    const fetchContent = async () => {
      try {
        const userId = UserAuthHelper.getUserId();
        const response = (await api.getUser(userId)) as ApiResponse<
          User | ErrorResponse
        >;

        if (response.ok) {
          const user = response.data as User;
          setUser(user);
          setUsername(user.username);
          setBio(user.bio);
          setTechnologies(user.technologies);
        } else {
          setError((response.data as ErrorResponse).message);
        }
      } catch {
        setError('Failed to get user information');
      }

      setIsLoading(false);
    };

    fetchContent();
  }, []);

  const handleClick = async () => {
    const api = ServiceResolver.apiResolver();

    try {
      const updatedUser: User = {
        id: UserAuthHelper.getUserId(),
        username,
        bio,
        technologies,
        projects: user?.projects,
      };
      const response = (await api.editUser(updatedUser)) as ApiResponse<
        User | ErrorResponse
      >;

      if (response.ok) {
        setSuccess('Settings saved');
      } else {
        setError((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setError('Failed to save settings. Please try again');
    }
  };

  return (
    <SettingsContainer
      error={error}
      setError={setError}
      success={success}
      setSuccess={setSuccess}
      isLoading={isLoading}
    >
      <ContainerSidePanel style={{ paddingTop: 32 }}>
        <MenuItem>General</MenuItem>
      </ContainerSidePanel>
      <MainContent>
        <Form>
          <Image
            src={(user && user.profilePictureUrl) || DefaultImage}
            width="64"
            height="64"
          />
          <FormLabel html-for="username">Username</FormLabel>
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />

          <FormLabel>Bio</FormLabel>

          <FormTextArea
            name="bio"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBio(e.target.value)
            }
            value={bio}
            rows={5}
          >
            {bio}
          </FormTextArea>
          <br />

          <FormLabel>Technologies</FormLabel>
          {user && user.technologies && (
            <TechnologiesSelect
              setError={setError}
              initialValues={technologies?.map((t) => t.name)}
              setTechnologies={setTechnologies}
            />
          )}
          <ButtonWrapper>
            <ApiButton handleClick={handleClick} statusText="Saving">
              Save
            </ApiButton>
          </ButtonWrapper>
        </Form>
      </MainContent>
    </SettingsContainer>
  );
};
