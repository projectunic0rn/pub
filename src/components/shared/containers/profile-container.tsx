import React, { FC, useEffect, useState } from 'react';

import { BaseContainer } from './base-container';
import { MainContent } from './main-content';
import { Wrapper } from '../page';
import { FormLabel } from '../form';
import { ContainerSidePanel, Summary, Image } from '../side-panels';
import { ProfileTechPill } from '../pills';
import { Ribbon, CloseButton } from '../ribbons';
import { ApiResponse, ErrorResponse, ServiceResolver, User } from '@api';
import { Loader } from '@components/shared';
import { defaultProfileImage } from '@images';

interface ProfileContainerProps {
  id?: string;
  path: string;
}

export const ProfileContainer: FC<ProfileContainerProps> = ({ id }) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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
              <Image
                src={(user && user.profilePictureUrl) || defaultProfileImage}
              />
              <Summary>{user && user.username}</Summary>
            </Summary>
          </ContainerSidePanel>
          <MainContent>
            <FormLabel>Bio</FormLabel>
            <br />
            <p>{user && user.bio}</p>

            <FormLabel>Technologies</FormLabel>
            <br />
            {user &&
              user.technologies.map((t) => (
                <ProfileTechPill key={t}>{t}</ProfileTechPill>
              ))}
          </MainContent>
        </BaseContainer>
      )}
    </Wrapper>
  );
};
