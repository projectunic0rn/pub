import * as React from 'react';

import { avatarTestimonial, iconQuotes } from '@images';
import styled from '@styled-components';

const Card = styled.div`
  background: #fff;
  padding: 25px;
  margin: 50px 0;
  max-width: 400px;
  width: 95%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const CardIcon = styled.img.attrs({ src: iconQuotes, alt: '' })`
  height: 15px;
  margin: 0 0 15px;
`;

const CardText = styled.p`
  margin: 0 0 24px 0;
  /* line-height: 1.5; */
  line-height: 2;
  font-style: italic;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5em;
`;

const CardAvatarWrapper = styled.figure`
  margin: 0 18px 0 9px;
`;

const CardAvatar = styled.img.attrs({ src: avatarTestimonial, alt: '' })`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0;
  border-radius: 50%;
`;

const CardFooterText = styled.p`
  margin: 0;

  & span {
    display: block;
  }
`;

const CardFooterTextName = styled.span`
  font-weight: 700;
`;

const CardFooterTextDescription = styled.span`
  font-size: 0.9em;
`;

const CardV2: React.FC = () => (
  <Card>
    <CardIcon />

    <CardText>
      Project Unicorn gave me an opportunity of move out of my comfort zone.
    </CardText>

    <CardFooter>
      <CardAvatarWrapper>
        <CardAvatar />
      </CardAvatarWrapper>

      <CardFooterText>
        <CardFooterTextName>Rodger Jordas</CardFooterTextName>

        <CardFooterTextDescription>
          Software developer
        </CardFooterTextDescription>
      </CardFooterText>
    </CardFooter>
  </Card>
);

export default CardV2;
