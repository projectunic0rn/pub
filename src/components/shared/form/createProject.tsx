import React, { useState, useEffect } from 'react';
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
import styled from '@styled-components';
import CtaButton from '@components/index-page/cta-button';
import ServiceResolver from '@/api/service-resolver';
import { Project } from '@/api/types/project';
import { Tags, Item } from '@/api/types/stack-exchange';
import { FormVal } from '@/utils/form-validation';

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
  const validation = new FormVal();

  const [formInputs, setFormInputs] = useState({
    pName: { val: '', required: true },
    pDesc: { val: '', required: true },
    pTech: { val: [] as any, required: true },
    pType: { val: '', required: true },
    pRepo: { val: '', required: true },
    pLaunch: { val: '', required: true },
    pComm: { val: '', required: true },
  });

  const [projectTypes, setProjectTypes] = useState<any>([]); // create ProjectTypes type
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const styles = {
    control: (styles: {}) => {
      return {
        ...styles,
        border: formErrors.includes('pTech')
          ? '1px solid red'
          : '1px solid lightgray;',
        background: formErrors.includes('pTech') ? '#fff1f4' : 'white',
      };
    },
    multiValue: (styles: {}) => {
      return {
        ...styles,
        backgroundColor: '#5f8ddc',
      };
    },
    multiValueLabel: (styles: {}) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles: {}) => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: '#486ca8',
        color: 'white',
      },
    }),
  };

  useEffect(() => {
    /*
      import { navigate } from '@reach/router';

        if (!UserAuthHelper.isUserAuthenticated()) {
          navigate('/signin', {
            state: { message: 'You need to be signed it to join a project' },
          });
          return;
        }
      }
    */

    async function fetchProjectTypes() {
      try {
        const projTypes: any = await api.getProjectTypes();
        setProjectTypes([...projTypes.data]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProjectTypes();
  }, []);

  const promiseOptions = async (inputValue: string) => {
    try {
      const data = (await StackExchange.searchTags(inputValue)) as Tags;
      return data.items.map((item: Item) => ({
        value: item.name,
        label: item.name,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (e: any) => {
    let technologies = formInputs.pTech;
    technologies = e
      ? e.map((tag: { value: string }) => ({ name: tag.value }))
      : [];
    setFormInputs({
      ...formInputs,
      pTech: { ...formInputs.pTech, val: technologies },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, val = '') => {
    const { name, value } = e.target;
    const state: any = formInputs;
    state[name].val = value;

    if (name === 'pDesc') state[name].val = val;

    setFormInputs({ ...state });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const formErrorState: string[] = formErrors;
    const formInputState: any = formInputs;
    const obj: any = {};
    obj[name] = formInputState[name];
    const errors = validation.checkValidation(obj);

    if (!errors.length) {
      formErrorState.splice(formErrorState.indexOf(name), 1);
    } else {
      if (!formErrorState.includes(name)) {
        formErrorState.push(name);
      }
    }

    setFormErrors([...formErrorState]);
  };

  const handleAsyncSelectOnBlur = (e: any) => {
    const formErrorState: string[] = formErrors;

    if (formErrorState.indexOf('pTech') > 0 || formInputs.pTech.val.length) {
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
    const errors = validation.checkValidation(formInputs);

    if (errors.length) return setFormErrors([...errors]);

    const formData: Project = {
      name: pName.val,
      description: pDesc.val,
      launchDate: new Date(pLaunch.val),
      projectType: pType.val,
      repositoryUrl: pRepo.val,
      communicationPlatformUrl: pComm.val,
      communicationPlatform: pComm.val, // name of platform (slack/discord)
      lookingForMembers: true,
      projectTechnologies: pTech.val,
      projectUsers: [
        {
          userId: 'string', // UserAuthHelper.getUserId()
          isOwner: true,
          username: 'string', // UserAuthHelper.getUsername()
        },
      ],
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
            Communication Platform Invitation Link
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
            (Slack or Discord)
          </FormHint>
          <FormLabel htmlFor="technologies">Technologies</FormLabel>
          <AsyncSelect
            cacheOptions
            defaultOptions
            isMulti
            onChange={handleSelectChange}
            styles={styles}
            onBlur={(e: any) => handleAsyncSelectOnBlur(e)}
            loadOptions={promiseOptions}
          />
          {formErrors.includes('pTech') && (
            <ErrorMessage value="Technologies" />
          )}
          <FormHint>Add the technologies used in your application</FormHint>
          <ButtonWrapper>
            <CtaButton title="Create" href="" type="input" content="Create" />
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
