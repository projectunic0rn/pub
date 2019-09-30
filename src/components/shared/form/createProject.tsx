import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Form, ErrorMessage } from '@components/shared/form';
import AsyncSelect from 'react-select/async';
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
  const StackExchange = new ServiceResolver().StackExchangeResolver();

  const [formInputs, setFormInputs] = useState({
    pName: { val: '', required: true },
    pDesc: { val: '', required: true },
    pTech: { val: [] as any, required: true },
    pType: { val: '', required: true },
    pRepo: { val: '', required: true },
    pLaunch: { val: '', required: true },
    pComm: { val: '', required: true },
  });

  const [projectTypes, setProjectTypes] = useState<any>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const styles = {
    control: (styles: any) => {
      return {
        ...styles,
        border: formErrors.includes('pTech')
          ? '1px solid red'
          : '1px solid lightgray;',
        background: formErrors.includes('pTech') ? '#fff1f4' : 'white',
      };
    },
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

  useEffect(() => {
    async function fetchProjectTypes() {
      const projTypes: any = await api.getProjectTypes();
      setProjectTypes([...projTypes.data]);
    }

    fetchProjectTypes();
  }, []);

  const promiseOptions = async (inputValue: string) => {
    const json = await fetch(
      `https://api.stackexchange.com/2.2/tags?site=stackoverflow&key=*08t5pMLzA0X50xU9dNGbQ((&inname=${inputValue}`,
    );
    const data = await json.json();
    return data.items.map((tag: { name: string }) => ({
      value: tag.name,
      label: tag.name,
    }));
  };

  const handleSelectChange = (e: any) => {
    let technologies = formInputs.pTech;
    technologies = e ? e.map((tag: any) => ({ name: tag.value })) : [];
    setFormInputs({
      ...formInputs,
      pTech: { ...formInputs.pTech, val: technologies },
    });
  };

  const handleChange = (e: any, val = '') => {
    const { name, value } = e.target;
    const state: any = formInputs;
    state[name].val = value;

    if (name === 'pDesc') state[name].val = val;

    setFormInputs({ ...state });
  };

  const handleBlur = (e: any) => {
    const { name } = e.target;
    const formErrorState: any = formErrors;
    const formInputState: any = formInputs;

    if (formInputState[name].val) {
      formErrorState.splice(formErrorState.indexOf(name), 1);
    } else {
      formErrorState.push(name);
    }

    setFormErrors([...formErrorState]);
  };

  const onInputChange = (e: any) => {
    const formErrorState: any = formErrors;

    if (formErrorState.indexOf('pTech') > 0) {
      if (formInputs.pTech.val.length) {
        formErrorState.splice(formErrorState.indexOf('pTech'), 1);
      }
    } else {
      if (!formInputs.pTech.val.length) {
        formErrorState.push('pTech');
      }
    }

    setFormErrors([...formErrorState]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { pName, pDesc, pTech, pType, pRepo, pLaunch, pComm } = formInputs;
    const errors = formValidation(formInputs);

    if (errors.length) return setFormErrors([...errors]);

    const formData = {
      name: pName.val,
      description: pDesc.val,
      projectType: pType.val,
      technologies: pTech.val,
      projectRepo: pRepo.val,
      launchDate: new Date(pLaunch.val),
      communicationPlatform: pComm.val,
    };

    try {
      api.createProject(formData);
    } catch (error) {
      console.log(error);
    }
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
          <FormLabel htmlFor="technologies">Technologies</FormLabel>
          <AsyncSelect
            cacheOptions
            defaultOptions
            isMulti
            onChange={handleSelectChange}
            styles={styles}
            onBlur={(e: any) => onInputChange(e)}
            loadOptions={promiseOptions}
          />
          {formErrors.includes('pTech') && (
            <ErrorMessage value="Technologies" />
          )}
          <ButtonWrapper>
            <CtaButton title="Create" href="" type="input" content="Create" />
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
