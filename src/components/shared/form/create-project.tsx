import { navigate } from 'gatsby';
import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select/src/types';
import styled, { ThemeContext } from 'styled-components';

import { ApiButton } from '../buttons';
import { Ribbon, CloseButton } from '../ribbons';
import {
  ServiceResolver,
  Project,
  Tag,
  Item,
  ProjectType,
  ProjectTechnology,
  ApiResponse,
  ErrorResponse,
} from '@api';
import { Form } from '@components/shared/form';
import { Message } from '@components/shared';
import {
  FormLabel,
  FormInput,
  FormHint,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
} from './controls';
import { UserAuthHelper } from '@helpers';
import { FormVal, Props } from '@utils';

interface OptionType {
  label: string;
  value: string;
}

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

export const CreateProjectForm: FC = () => {
  const theme = useContext(ThemeContext);
  const stackExchange = ServiceResolver.stackExchangeResolver();
  const validation = new FormVal();

  const [formInputs, setFormInputs] = useState<FormInput>({
    pName: { val: '', required: true },
    pDesc: { val: '', required: true },
    pTech: { val: [], required: true },
    pType: { val: '', required: true },
    pRepo: { val: '', required: true },
    pLaunch: { val: '', required: true },
    pComm: { val: '', required: true },
  });

  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const promiseOptions = async (inputValue: string) => {
    try {
      const data = (await stackExchange.searchTags(inputValue)) as Tag;
      const options: OptionType[] = data.items.map((item: Item) => ({
        value: item.name,
        label: item.name,
      }));

      return options;
    } catch (error) {
      setError('Failed to get tags');
    }
  };

  const handleSelectChange = (e: ValueType<OptionType>) => {
    let technologies: ProjectTechnology[];

    if (Array.isArray(e)) {
      technologies = e.map((v) => ({ name: v.value, projectId: '' }));
    } else {
      technologies = [];
    }

    setFormInputs({
      ...formInputs,
      pTech: { ...formInputs.pTech, val: technologies },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, val = '') => {
    const { name, value } = e.target;
    const state = formInputs;
    state[name].val = value;

    if (name === 'pDesc') state[name].val = val;

    setFormInputs({ ...state });
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

      if (response.ok) navigate(`/app/projects`);
      else setError((response.data as ErrorResponse).message);
    } catch (err) {
      setError('Failed to create project');
    }
  };

  return (
    <Wrapper>
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
          ​<FormLabel htmlFor="description">Description</FormLabel>
          <FormTextArea
            name="pDesc"
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
            <Message variant="error" value="Project Type Required" />
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
            <Message variant="error" value="Project Repo Required" />
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
            <Message variant="error" value="Launch Date Required" />
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
