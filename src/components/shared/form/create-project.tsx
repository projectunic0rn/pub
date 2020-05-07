import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import React, { ChangeEvent, FC, FocusEvent, useState, useEffect } from 'react';
import { ValueType } from 'react-select/src/types';
import styled from 'styled-components';

import {
  FormLabel,
  FormInput,
  FormHint,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
  TechnologiesSelect,
} from './controls';
import { ApiButton } from '../buttons';
import { Ribbon, CloseButton } from '../ribbons';
import Message from '../message';
import {
  ApiResponse,
  ErrorResponse,
  Project,
  ProjectTechnology,
  ProjectType,
  ServiceResolver,
} from '@api';
import { Seo } from '@components/shared';
import { Form } from '@components/shared/form';
import { FormVal, Props } from '@utils';
import { UserAuthHelper } from '@helpers';

type OwnProps = {};
type CreateProjectFormProps = OwnProps & RouteComponentProps;

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

interface FormValue<T = string> {
  val: T;
  required: boolean;
}

interface OptionType {
  label: string;
  value: string;
}

type FormInputIndexPropType = string | ProjectTechnology[];

interface FormInput {
  pName: FormValue;
  pDesc: FormValue;
  pTech: FormValue<ProjectTechnology[]>;
  pType: FormValue;
  pRepo: FormValue;
  pLaunch: FormValue;
  pComm: FormValue;
  [key: string]: FormValue<FormInputIndexPropType>;
}

export const CreateProjectForm: FC<CreateProjectFormProps> = () => {
  const validation = new FormVal();

  const [formInputs, setFormInputs] = useState<FormInput>({
    pName: { val: '', required: true },
    pDesc: { val: '', required: true },
    pTech: { val: [], required: true },
    pType: { val: '', required: true },
    pRepo: { val: '', required: false },
    pLaunch: { val: '', required: true },
    pComm: { val: '', required: true },
  });

  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = ServiceResolver.apiResolver();

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
        setProjectTypes(response.data as ProjectType[]);
      } catch (error) {
        setError('Failed to get project types');
      }
    }

    fetchProjectTypes();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, val = '') => {
    const { name, value } = e.target;
    const state = formInputs;
    state[name].val = value;

    if (name === 'pDesc') state[name].val = val;

    setFormInputs({ ...state });
  };

  const handleSelectChange = (e: ValueType<OptionType>) => {
    const technologies: ProjectTechnology[] = Array.isArray(e)
      ? e.map((v) => ({ name: v, projectId: '' }))
      : [];

    setFormInputs({
      ...formInputs,
      pTech: { ...formInputs.pTech, val: technologies },
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const formErrorState: string[] = formErrors;
    const formInputState = formInputs;
    const obj: Props<FormInputIndexPropType> = {};
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

  const getPlatformName = () => {
    const platformName = formInputs['pComm'].val;
    return platformName.search('slack') > 0 ? 'slack' : 'discord';
  };

  const handleClick = async () => {
    const api = ServiceResolver.apiResolver();

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

      if (response.ok) {
        navigate(`/projects`);
      } else {
        setError((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setError('Failed to create project');
    }
  };

  return (
    <Wrapper>
      <Seo title="Create A New Project" urlSlug="project/create/" />

      {error !== null && (
        <Ribbon type="danger">
          {error}
          <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}
      <FormWrapper>
        <Form heading={'Create a New Project'}>
          <FormLabel htmlFor="project-name">Project Name</FormLabel>
          <FormInput
            name="pName"
            id="project-name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formInputs['pName'].val}
            hasError={formErrors.includes('pName')}
          />
          {formErrors.includes('pName') && (
            <Message variant="error" value="Project Name Required" />
          )}
          <FormHint>
            Make your project name simple, specific and memorable
          </FormHint>
          <FormLabel htmlFor="description">Description</FormLabel>
          <FormTextArea
            name="pDesc"
            id="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formInputs['pDesc'].val}
            displayCharCount={true}
            maxCharCount={280}
            hasError={formErrors.includes('pDesc')}
          />
          {formErrors.includes('pDesc') && (
            <Message variant="error" value="Project Description Required" />
          )}
          <FormHint>Describe your project in a single tweet</FormHint>
          <FormLabel htmlFor="project-type">Project Type</FormLabel>
          <FormSelectInput
            name="pType"
            id="project-type"
            options={projectTypes}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pType')}
            placeholder="Select a Project Type"
          />
          {formErrors.includes('pType') && (
            <Message variant="error" value="Project Type Required" />
          )}
          <FormHint>What category does your project belong to?</FormHint>
          <FormLabel htmlFor="project-repo">Project Repo</FormLabel>
          <FormInput
            name="pRepo"
            id="project-repo"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pRepo')}
          />
          {formErrors.includes('pRepo') && (
            <Message variant="error" value="Project Repo Required" />
          )}
          <FormHint>
            Share your project repo (GitHub, GitLab etc), optional
          </FormHint>
          <FormLabel htmlFor="launch-date">Launch Date</FormLabel>
          <FormInput
            name="pLaunch"
            id="launch-date"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pLaunch')}
          />
          {formErrors.includes('pLaunch') && (
            <Message variant="error" value="Launch Date Required" />
          )}
          <FormHint>
            Keep you and your team accountable with a launch date
          </FormHint>

          <FormLabel htmlFor="communication-platform">
            Communication Platform Invitation Link
          </FormLabel>
          <FormInput
            name="pComm"
            id="communication-platform"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={formErrors.includes('pComm')}
          />
          {formErrors.includes('pComm') && (
            <Message
              variant="error"
              value="Communication Platform link must be Slack or Discord"
            />
          )}
          <FormHint>
            Where will you communicate? Share the invite link to your workspace
            (Slack or Discord)
          </FormHint>
          <FormLabel htmlFor="technologies">Technologies</FormLabel>
          <TechnologiesSelect
            id="technologies"
            setError={setError}
            setTechnologies={handleSelectChange}
          />
          {formErrors.includes('pTech') && (
            <Message variant="error" value="At least one technology required" />
          )}
          <FormHint>Add the technologies used in your application</FormHint>
          <ButtonWrapper>
            <ApiButton handleClick={handleClick} statusText="Creating...">
              Create
            </ApiButton>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
