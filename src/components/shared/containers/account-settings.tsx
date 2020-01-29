import React from 'react';
import { MenuItem } from '../side-panels/container-side-panel';
import { MainContent } from './main-content';
import DefaultImage from '@images/default.png';
import { ContainerSidePanel, Image } from '../side-panels';
import {
  Form,
  FormLabel,
  FormInput,
  FormTextArea,
  ButtonWrapper,
  TechnologiesSelect,
} from '../form';
import { ApiButton } from '../buttons';
import ServiceResolver from '@/api/service-resolver';
import { UserAuthHelper } from '@/helpers';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { User } from '@/api/types/user';
import { SettingsContainer } from './settings-container';

interface OptionType {
  label: string;
  value: string;
}

export const AccountSettings: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [user, setUser] = React.useState<User>();
  const [username, setUsername] = React.useState<string>('');
  const [bio, setBio] = React.useState<string>('');
  const [technologies, setTechnologies] = React.useState<string[]>();

  const api = ServiceResolver.apiResolver();

  React.useEffect(() => {
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
  }, [api]);

  const handleClick = async () => {
    try {
      const user: User = {
        id: UserAuthHelper.getUserId(),
        username,
        bio,
        technologies,
      };
      const response = (await api.editUser(user)) as ApiResponse<
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
            onBlur={() => {}}
            rows={3}
          >
            {bio}
          </FormTextArea>
          <br />

          <FormLabel>Technologies</FormLabel>
          {user && user.technologies && (
            <TechnologiesSelect
              setError={setError}
              initialValues={technologies}
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
