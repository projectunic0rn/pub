import * as React from 'react';

import { Anchor } from '@components';
import { useSiteMetadata } from '@hooks';
import styled, { css } from '@styled-components';

const pStyles = css`
  font-size: 1.1em;
  margin: 25px 0;
`;

const CtaButton = styled(Anchor)`
  font-weight: 700;
  padding: 15px 45px;
  border: 1px solid #5f8ddc;
  border-radius: 5px;

  @media screen and (max-width: 41.6875em) {
    display: block;
    width: 90%;
    margin: 0 auto;
  }

  background: #5f8ddc;
  color: #fff;
`;

const Signup = styled.section`
  display: flex;
  align-items: center;
  padding: 75px 55px;
  /* background: hsl(238, 22%, 44%); */
  background: #5f8ddc;
  color: #fff;
  justify-content: space-between;

  @media screen and (max-width: 975px) {
    flex-direction: column;
    text-align: center;
  }

  @media screen and (max-width: 41.6875em) {
    padding: 45px 25px;
  }
`;

const SignupText = styled.div`
  flex: 0 0 40%;

  @media screen and (max-width: 41.6875em) {
    flex: 0 0 100%;
  }
`;

const SignupTextHeading = styled.h2`
  margin: 0;
  color: #fff;
`;

const SignupTextP = styled.p`
  ${pStyles};
  margin-bottom: 0;

  @media screen and (max-width: 975px) {
    ${pStyles};
  }
`;

const SignupForm = styled.div`
  @media screen and (max-width: 975px) {
    width: 100%;
  }
`;

const SignupV2: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Signup>
      <SignupText>
        <SignupTextHeading>Join our Slack group</SignupTextHeading>

        <SignupTextP>
          It only takes a minute to sign in to your slack account. If you have
          any questions, our members would be happy to help you.
        </SignupTextP>
      </SignupText>

      <SignupForm>
        <CtaButton
          href={`${siteMetadata.social.slackInvite}`}
          content="Join Slack"
          title={`${siteMetadata.title} Slack invite link`}
          style={{ border: '3px solid #fff', borderRadius: '5px' }}
        />
      </SignupForm>
    </Signup>
  );
};

export default SignupV2;
