import React, { useState } from 'react';
import { Form, ErrorMessage } from '../form';

import {
  FormLabel,
  FormInput,
  FormHint,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
} from './controls';
import { formValidation } from '../../../utils';
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
  const [formInputs, setFormInputs] = useState({
    pName: { val: '', required: true },
    pDesc: { val: '', required: true },
    pRepo: { val: '', required: true },
    pComm: { val: '', required: true },
  });

  // const [projectName, setProjectName] = useState('');
  // const [description, setDescription] = useState('');
  // const [projectType, setProjectType] = useState('');
  // const [technologies, setTechnologies] = useState('');
  // const [projectRepo, setProjectRepo] = useState('');
  // const [launchDate, setLaunchDate] = useState('');
  // const [communicationPlatform, setCommunicationPlatform] = useState('');

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const state: any = formInputs;
    state[name].val = value;

    setFormInputs({ ...state });
  };

  const handleBlur = (e: any) => {
    const { name } = e.target;
    const formErrorState: any = formErrors;
    const formInputState: any = formInputs;

    if (formInputState[name].val) {
      formErrorState.splice(formErrorState.indexOf(name), 1);
      setFormErrors([...formErrorState]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = formValidation(formInputs);

    if (errors) {
      setFormErrors([...errors]);
      return;
    }

    // make api call
  };

  console.log(formErrors);

  return (
    <Wrapper>
      <FormWrapper>
        <Form handleSubmit={handleSubmit} heading={'Create a New Project'}>
          <FormLabel htmlFor="project-name">Project Name</FormLabel>
          <FormInput
            name="pName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formInputs['pName'].val}
            hasError={formErrors.includes('pName')}
          />
          {formErrors.includes('pName') && (
            <ErrorMessage value="Project Name" />
          )}
          <FormHint>
            Make your project name simple, specific and memorable
          </FormHint>
          ​<FormLabel htmlFor="description">Description</FormLabel>
          <FormTextArea
            name="pDesc"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formInputs['pDesc'].val}
            displayCharCount={true}
            maxCharCount={135}
            hasError={formErrors.includes('pDesc')}
          />
          {formErrors.includes('pDesc') && (
            <ErrorMessage value="Project Description" />
          )}
          <FormHint>Describe your project in a single tweet</FormHint>​
          <FormLabel htmlFor="project-type">Project Type</FormLabel>
          <FormSelectInput
            options={['Community', 'Healthcare']}
            onChange={handleChange}
          />
          <FormHint>What category does your project belong to?</FormHint>​
          <FormLabel htmlFor="project-repo">Project Repo</FormLabel>
          <FormInput
            name="pRepo"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pRepo')}
          />
          {formErrors.includes('pRepo') && (
            <ErrorMessage value="Project Repo" />
          )}
          <FormHint>Share your project repo (GitHub, GitLib etc)</FormHint>​
          <FormLabel htmlFor="launch-date">Launch Date</FormLabel>
          <FormInput name="pLaunch" type="date" onChange={handleChange} />
          <FormHint>
            Keep you and your team accountable with a launch date
          </FormHint>
          ​
          <FormLabel htmlFor="communication-platform">
            Communication Platform
          </FormLabel>
          <FormInput
            name="pComm"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pComm')}
          />
          {formErrors.includes('pComm') && (
            <ErrorMessage value="Communication Platform" />
          )}
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
