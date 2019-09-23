import React, { useState } from 'react';
import { Form } from '../form';

import {
  FormLabel,
  FormInput,
  FormHint,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
} from './controls';
import styled from 'styled-components';
import CtaButton from '@components/index-page/cta-button';

const FormWrapper = styled.div`
  width: 400px;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 100%;
  }
`;

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

export const CreateProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [projectRepo, setProjectRepo] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [communicationPlatform, setCommunicationPlatform] = useState('');

  return (
    <Wrapper>
      <FormWrapper>
        <Form heading={'Create a New Project'}>
          <FormLabel htmlFor="project-name">Project Name</FormLabel>
          <FormInput
            type="text"
            onChange={(e: any) => setProjectName(e.target.value)}
            value={projectName}
          />
          <FormHint>
            Make your project name simple, specific and memorable
          </FormHint>
          ​<FormLabel htmlFor="description">Description</FormLabel>
          <FormTextArea
            onChange={(e: any, length: number) =>
              length < 135
                ? setDescription(e.target.value)
                : setDescription(e.target.value.slice(0, 135))
            }
            value={description}
            displayCharCount={true}
            maxCharCount={135}
          />
          <FormHint>Describe your project in a single tweet</FormHint>​
          <FormLabel htmlFor="project-type">Project Type</FormLabel>
          <FormSelectInput
            options={['Community', 'Healthcare']}
            onChange={(e: any) => setProjectType(e.target.value)}
          />
          <FormHint>What category does your project belong to?</FormHint>​
          <FormLabel htmlFor="project-repo">Project Repo</FormLabel>
          <FormInput
            type="text"
            onChange={(e) => setProjectRepo(e.target.value)}
          />
          <FormHint>Share your project repo (GitHub, GitLib etc)</FormHint>​
          <FormLabel htmlFor="launch-date">Launch Date</FormLabel>
          <FormInput
            type="date"
            onChange={(e) => setLaunchDate(e.target.value)}
          />
          <FormHint>
            Keep you and your team accountable with a launch date
          </FormHint>
          ​
          <FormLabel htmlFor="communication-platform">
            Communication Platform
          </FormLabel>
          <FormInput
            name="communicationPlatform"
            type="text"
            onChange={(e) => setCommunicationPlatform(e.target.value)}
          />
          <FormHint>
            Where will you communicate? Share the invite link to your workspace
            (Slack, Discord, Gitter etc)
          </FormHint>
          ​
          <ButtonWrapper>
            <CtaButton title="Create" href="" type="input" content="Create" />
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
