import * as React from 'react';

import CtaButton from './cta-button';
import styled, { css } from '@styled-components';

const pStyles = css`
  font-size: 1.1em;
  margin: 25px 0;
`;

const Wrapper = styled.section`
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

const Signup: React.FC = () => (
  <Wrapper>
    <SignupText>
      <SignupTextHeading>Join our Slack group</SignupTextHeading>

      <SignupTextP>
        It only takes a minute to sign in to your slack account. If you have any
        questions, our members would be happy to help you.
      </SignupTextP>
    </SignupText>

    <SignupForm>
      <CtaButton variant="secondary" />
    </SignupForm>
  </Wrapper>
);

export default Signup;
