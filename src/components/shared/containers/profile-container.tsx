import React from 'react';
import { BaseContainer } from './base-container';
import { Link } from 'gatsby';
import { Button } from '../buttons';
import DefaultImage from '@images/default-avatar-image.png';
import {
  ContainerSidePanel,
  Summary,
  ButtonContainer,
  Image,
} from '../side-panels';
import { MainContent } from './main-content';
import { FormLabel } from '../form';
import { User } from '@/api/types/user';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { Loader } from '@components/shared';
import { Ribbon, CloseButton, TechPill } from '..';
import { UserAuthHelper } from '@/helpers';
import { Wrapper } from '../page';

interface ProfileContainerProps {
  id?: string;
  path: string;
}

export const ProfileContainer: React.FC<ProfileContainerProps> = ({ id }) => {
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const api = ServiceResolver.apiResolver();

    const fetchContent = async () => {
      try {
        const response = (await api.getUser(id || '')) as ApiResponse<
          User | ErrorResponse
        >;

        if (response.ok) {
          const user = response.data as User;
          setUser(user);
        } else {
          setError((response.data as ErrorResponse).message);
        }
      } catch {
        setError('Failed to get user information');
      }

      setIsLoading(false);
    };

    fetchContent();
  }, [id]);

  return (
    <Wrapper>
      {isLoading && <Loader />}
      {error && (
        <Ribbon type="danger">
          {error}{' '}
          <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}

      {!isLoading && user && (
        <BaseContainer>
          <ContainerSidePanel style={{ padding: '20px ' }}>
            <Summary>
              <Image src={DefaultImage} />
              <Summary>{user && user.username}</Summary>
            </Summary>
            {UserAuthHelper.isUserAuthenticated() &&
              UserAuthHelper.getUserId() === id && (
                <ButtonContainer>
                  <Link to="/settings">
                    <Button>Edit Profile</Button>
                  </Link>
                </ButtonContainer>
              )}
          </ContainerSidePanel>
          <MainContent>
            <FormLabel>Bio</FormLabel>
            <br />
            <p>{user && user.bio}</p>

            <FormLabel>Technologies</FormLabel>
            <br />
            {user &&
              user.technologies.map((t) => <TechPill key={t}>{t}</TechPill>)}
          </MainContent>
        </BaseContainer>
      )}
    </Wrapper>
  );
};
