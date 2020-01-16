import React, { FC } from 'react';
import styled from 'styled-components';

import { dotIcon } from '../../../images';

interface OwnProps {
  content: string;
}

type ProfileProps = OwnProps;

const ProfileIconContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

const ProfileIcon = styled.img`
  border-radius: 100%;
  margin-bottom: -0.9em !important;
`;

const ProfileDot = styled.img`
  position: absolute;
  top: 1.5em;
  right: -0.2em;
`;

const Profile: FC<ProfileProps> = ({ content }) => (
  <ProfileIconContainer>
    <ProfileIcon src={content} height={46} width={46} alt="profile image" />
    <ProfileDot src={dotIcon} height={16} width={16} alt="blue dot" />
  </ProfileIconContainer>
);

export default Profile;
