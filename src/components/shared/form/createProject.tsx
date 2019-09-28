import React, { useState, useEffect } from 'react';
import { Form, ErrorMessage } from '../form';
import Select from 'react-select';

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
import ServiceResolver from '../../../api/service-resolver';

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const colourStyles = {
  multiValue: (styles: any) => {
    return {
      ...styles,
      backgroundColor: '#5f8ddc',
    };
  },
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#486ca8',
      color: 'white',
    },
  }),
};

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
  const api = new ServiceResolver().ApiResolver();

  const [formInputs, setFormInputs] = useState({
    pName: { val: '', required: true },
    pDesc: { val: '', required: true },
    pTech: { val: ['JS'], required: true },
    pType: { val: null, required: true },
    pRepo: { val: '', required: true },
    pLaunch: { val: '', required: true },
    pComm: { val: '', required: true },
  });

  const [projectTypes, setProjectTypes] = useState<any>([]);

  // const [projectName, setProjectName] = useState('');
  // const [description, setDescription] = useState('');
  // const [projectType, setProjectType] = useState('');
  // const [technologies, setTechnologies] = useState('');
  // const [projectRepo, setProjectRepo] = useState('');
  // const [launchDate, setLaunchDate] = useState('');
  // const [communicationPlatform, setCommunicationPlatform] = useState('');

  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProjectTypes() {
      const projTypes: any = await api.getProjectTypes();

      setProjectTypes([...projTypes.data]);
    }

    fetchProjectTypes();
  }, []);

  const handleChange = (e: any, val = '') => {
    const { name, value } = e.target;
    const state: any = formInputs;
    state[name].val = value;

    if (name === 'pDesc') {
      state[name].val = val;
    }

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

    const { pName, pDesc, pTech, pType, pRepo, pLaunch, pComm } = formInputs;
    const errors = formValidation(formInputs);
    console.log(errors);
    if (errors.length) {
      setFormErrors([...errors]);
      return;
    }

    // make api call
    const formData = {
      name: pName.val,
      description: pDesc.val,
      projectType: 1,
      technologies: pTech.val,
      projectRepo: pRepo.val,
      launchDate: new Date(pLaunch.val),
      communicationPlatform: pComm.val,
    };

    api.createProject(formData);
  };

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
            name="pType"
            options={projectTypes}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pType')}
            placeholder="Select a Project Type"
          />
          {formErrors.includes('pType') && (
            <ErrorMessage value="Project Type" />
          )}
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
          <FormInput
            name="pLaunch"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pLaunch')}
          />
          {formErrors.includes('pLaunch') && (
            <ErrorMessage value="Project Launch" />
          )}
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
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={colourOptions}
            styles={colourStyles}
          />
          <ButtonWrapper>
            <CtaButton title="Create" href="" type="input" content="Create" />
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
