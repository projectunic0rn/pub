import React from 'react';
import {
  FormLabel,
  FormInput,
  FormHint,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
} from './controls';
import styled from 'styled-components';
import { useState } from 'react';
import CtaButton from '@components/index-page/cta-button';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};
​
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
​
  @media screen and(max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }
​
  @media screen and(max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Heading = styled.h2``;
const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
`;

interface FormProps {
  heading?: string;
}
const Form: React.FC<FormProps> = ({ heading, children }) => {
  return (
    <FormElement>
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

const CreateProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [projectRepo, setProjectRepo] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [communicationPlatform, setCommunicationPlatform] = useState('');

  return (
    <Wrapper>
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
          onChange={(e: any) => setDescription(e.target.value)}
          value={description}
          displayCharCount={false}
          maxCharCount={135}
          key={Math.random()}
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
    </Wrapper>
  );
};

export { Form, CreateProjectForm };
