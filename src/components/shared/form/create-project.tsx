import React, { useState, useEffect, useContext } from 'react';
import { Form } from '@components/shared/form';
import { ErrorMessage } from '@components/shared/form/error-msg';
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
import { ThemeContext } from 'styled-components';
import CtaButton from '@components/index-page/cta-button';
import ServiceResolver from '@/api/service-resolver';
import { Project } from '@/api/types/project';
import { Tag, Item } from '@/api/types/stack-exchange';
import { ProjectType } from '@/api/types/project-types';
import { FormVal } from '@/utils/form-validation';
import { navigate } from 'gatsby';
import { UserAuthHelper } from '@/helpers';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';

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

const Message = styled.div`
  background: ${({ theme }) => theme.colors.alert.danger};
  color: white;
  width: 100%;
  height: 35px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  text-align: center;
  font-size: 16px;
`;

const MessageCloseButton = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.colors.baseinvert};
  right: 15px;

  :hover {
    cursor: pointer;
  }
`;

export const CreateProjectForm: React.FC = () => {
  const theme = useContext(ThemeContext);
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

  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const styles = {
    control: (styles: {}) => {
      return {
        ...styles,
        border: formErrors.includes('pTech')
          ? `1px solid ${theme.colors.alert.danger}`
          : `1px solid ${theme.colors.greyDark};`,
        background: formErrors.includes('pTech')
          ? theme.colors.input.errorBg
          : theme.colors.baseinvert,
      };
    },
    multiValue: (styles: {}) => {
      return {
        ...styles,
        backgroundColor: theme.colors.highlight,
      };
    },
    multiValueLabel: (styles: {}) => ({
      ...styles,
      color: theme.colors.baseinvert,
    }),
    multiValueRemove: (styles: {}) => ({
      ...styles,
      color: theme.colors.baseinvert,
      ':hover': {
        backgroundColor: theme.colors.highlightDark,
        color: theme.colors.baseinvert,
      },
    }),
  };

  const setMessage = (message: string) => {
    setIsError(message !== null && message !== '');
    setError(message);
  };

  useEffect(() => {
    const api = new ServiceResolver().ApiResolver();

    if (!UserAuthHelper.isUserAuthenticated()) {
      navigate('/signin', {
        state: { message: 'You need to be signed it to create a new project' },
      });
      return;
    }

    async function fetchProjectTypes() {
      try {
        const response = (await api.getProjectTypes()) as ApiResponse<
          ProjectType[] | ErrorResponse
        >;

        if (!response.ok) setError((response.data as ErrorResponse).message);

        setIsError(!response.ok);
        setProjectTypes(response.data as ProjectType[]);
      } catch (error) {
        setMessage('Failed to get project types');
      }
    }

    fetchProjectTypes();
  }, []);

  const promiseOptions = async (inputValue: string) => {
    try {
      const data = (await StackExchange.searchTags(inputValue)) as Tag;
      return data.items.map((item: Item) => ({
        value: item.name,
        label: item.name,
      }));
    } catch (error) {
      setMessage('Failed to get tags');
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

  const handleAsyncSelectOnBlur = () => {
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

  const getPlatformName = () => {
    const platformName = formInputs['pComm'].val;
    return platformName.search('slack') > 0 ? 'slack' : 'discord';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = new ServiceResolver().ApiResolver();

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
      communicationPlatform: getPlatformName(),
      lookingForMembers: true,
      projectTechnologies: pTech.val,
      projectUsers: [
        {
          userId: UserAuthHelper.getUserId(),
          isOwner: true,
        },
      ],
    };

    try {
      const response = (await api.createProject(formData)) as ApiResponse<
        Project | ErrorResponse
      >;

      if (response.ok) navigate(`/app/projects}`);
      else setError((response.data as ErrorResponse).message);

      setIsError(!response.ok);
    } catch (err) {
      setMessage('Failed to create project');
    }
  };

  return (
    <Wrapper>
      {isError && (
        <Message>
          {error}
          <MessageCloseButton onClick={() => setMessage('')}>
            &#10006;
          </MessageCloseButton>
        </Message>
      )}
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
          <FormHint>Share your project repo (GitHub, GitLab etc)</FormHint>​
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
            onBlur={handleAsyncSelectOnBlur}
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
