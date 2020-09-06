import { Link } from 'gatsby';
import React, { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BaseContainer } from './base-container';
import { MainContent } from './main-content';
import { FormLabel, FeedbackForm } from '../form';
import { ProfileTechPill } from '../pills';
import { Ribbon, CloseButton } from '../ribbons';
import { ContainerSidePanel, Summary } from '../side-panels';
import {
  ApiResponse,
  ErrorResponse,
  ServiceResolver,
  User,
  UserContact,
} from '@api';
import { Loader } from '@components/shared';
import { UserAuthHelper } from '@helpers';
import { defaultProfileImage } from '@images';
import { Button } from '../buttons';

type ProfileContainerProps = {
  id?: string;
  path: string;
};

const Image = styled.img`
  border-radius: 50%;
  max-width: 40%;
  margin-bottom: 0;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 50vh;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  }
`;

export const ProfileContainer: FC<ProfileContainerProps> = ({ id }) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayContact, setDisplayContact] = useState(false);
  const [contact, setContact] = useState('');
  // indicate if profile belongs to viewing user
  const [selfProfile, setSelfProfile] = useState(false);

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
    if (id === undefined) {
      return;
    }
    const fetchContent = async () => {
      try {
        const response = (await api.getUser(id)) as ApiResponse<
          User | ErrorResponse
        >;

        const user = response.data as User;
        setUser(user);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    const fetchContactInfo = async () => {
      try {
        const response = (await api.getUserContact(id)) as ApiResponse<
          UserContact | ErrorResponse
        >;

        const userContact = response.data as UserContact;
        setContact(userContact.email);
        setDisplayContact(true);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContent();
    if (!UserAuthHelper.isUserAuthenticated()) {
      return;
    }

    fetchContactInfo();
    const authedUserId = UserAuthHelper.getUserId();

    if (authedUserId === id) {
      setSelfProfile(true);
    }
  }, [id]);

  return (
    <Fragment>
      <FeedbackForm page={`/profile/${user?.id}`} />
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
            <ContainerSidePanel>
              <Summary>
                <Image
                  src={user.profilePictureUrl || defaultProfileImage}
                  alt="Profile Picture"
                />
                <Summary>{user.username}</Summary>
                {selfProfile && (
                  <Link to="/settings">
                    <Button>Edit Profile</Button>
                  </Link>
                )}
              </Summary>
            </ContainerSidePanel>
            <MainContent>
              <Fragment>
                <FormLabel>About</FormLabel>
                <p>{user.bio}</p>
              </Fragment>

              <Fragment>
                <FormLabel>Technologies</FormLabel>
                <div style={{ marginTop: '0.4em', marginBottom: '1.5em' }}>
                  {user.technologies.map((t) => (
                    <ProfileTechPill data-testid="technology" key={t.name}>
                      {t.name}
                    </ProfileTechPill>
                  ))}
                </div>
              </Fragment>

              <FormLabel>Contact</FormLabel>
              <p data-testid={'contact-info'}>
                {displayContact ? (
                  <a href={`mailto:${contact}`}>{contact}</a>
                ) : (
                  <Link to="/signin/">Sign in to view email.</Link>
                )}{' '}
              </p>
            </MainContent>
          </BaseContainer>
        )}
      </Wrapper>
    </Fragment>
  );
};
