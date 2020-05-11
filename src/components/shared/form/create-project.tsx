import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import React, { FC, useState, useEffect, FocusEvent } from 'react';
import { ValueType } from 'react-select/src/types';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  FormInput,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
  TechnologiesSelect,
} from './controls';
import { Button } from '../buttons';
import { Ribbon, CloseButton } from '../ribbons';
import { messages } from '../../../const';
import {
  ApiResponse,
  ErrorResponse,
  Project,
  ProjectTechnology,
  ProjectType,
  ServiceResolver,
} from '@api';
import { Seo } from '@components/shared';
import { UserAuthHelper } from '@helpers';
import { Form } from './form';
import { customHandleBlur, hasError } from '@utils/form-validation';

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

interface FormValues {
  name: string;
  description: string;
  launchDate: string;
  projectType: ProjectType;
  repositoryUrl: string;
  communicationPlatformUrl: string;
  technologies: Array<ProjectTechnology>;
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
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [error, setError] = useState<string | null>(null);

  let focusedElements: Array<string> = [];

  const initialValues: FormValues = {
    name: '',
    description: '',
    launchDate: '',
    projectType: { id: '', type: '' },
    repositoryUrl: '',
    communicationPlatformUrl: '',
    technologies: [],
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(messages.validation.required),
    description: yup.string().required(messages.validation.required),
    launchDate: yup.string().required(messages.validation.required),
    projectType: yup.string().required(messages.validation.required),
    repositoryUrl: yup
      .string()
      .required(messages.validation.required)
      .url(messages.validation.url),
    communicationPlatformUrl: yup
      .string()
      .required(messages.validation.required)
      .url(messages.validation.url),
    technologies: yup.array().required(messages.validation.required),
  });

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

        if (response.ok) {
          const data = response.data as ProjectType[];

          setProjectTypes(data);
          initialValues.projectType = data[0];
        } else setError((response.data as ErrorResponse).message);
      } catch (error) {
        setError('Failed to get project types');
      }
    }

    fetchProjectTypes();
  });

  const handleSelectChange = (e: ValueType<OptionType>, values: FormValues) => {
    const technologies: ProjectTechnology[] = Array.isArray(e)
      ? e.map((v) => ({ name: v, projectId: '' }))
      : [];

    values.technologies = technologies;
  };

  const makeApiCall = async (values: FormValues, setSubmitting: Function) => {
    setSubmitting(true);

    const api = ServiceResolver.apiResolver();
    const {
      name,
      description,
      launchDate,
      projectType,
      repositoryUrl,
      communicationPlatformUrl,
      technologies,
    } = values;

    const communicationPlatform = communicationPlatformUrl.startsWith(
      'https://slack',
    )
      ? 'slack'
      : 'discord';

    const formData: Project = {
      name,
      description,
      launchDate: new Date(launchDate),
      projectType: projectType.type,
      repositoryUrl,
      communicationPlatformUrl,
      communicationPlatform,
      lookingForMembers: true,
      projectTechnologies: technologies,
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) =>
            makeApiCall(values, setSubmitting)
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
            errors,
          }) => (
            <Form
              heading={'Create a New Project'}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormInput
                label="Project Name"
                name="name"
                hint="Make your project name simple, specific and memorable"
                onBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
                hasError={hasError(errors, focusedElements, 'name')}
              />
              <FormTextArea
                name="description"
                label="Description"
                hint="Describe your project in a single tweet"
                displayCharCount={true}
                maxCharCount={280}
                value={values.description}
                onChange={handleChange}
                onBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
                hasError={hasError(errors, focusedElements, 'description')}
              />
              <FormSelectInput
                name="projectType"
                label="Project Type"
                hint="What category does your project belong to?"
                options={projectTypes}
                onChange={handleChange}
                onBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
                hasError={hasError(errors, focusedElements, 'projectType')}
              />
              <FormInput
                label="Project Repo"
                name="repositoryUrl"
                hint="Share your project repo (GitHub, GitLab etc), optional"
                hasError={hasError(errors, focusedElements, 'repositoryUrl')}
                onBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
              />
              <FormInput
                type="date"
                label="Launch Date"
                name="launchDate"
                hint="Keep you and your team accountable with a launch date"
                hasError={hasError(errors, focusedElements, 'launchDate')}
                onBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
              />
              <FormInput
                label="Communication Platform Invitation Link"
                name="communicationPlatformUrl"
                hint="Where will you communicate? Share the invite link to your
                workspace (Discord or Slack)"
                hasError={hasError(
                  errors,
                  focusedElements,
                  'communicationPlatformUrl',
                )}
                onBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
              />
              <TechnologiesSelect
                name="technologies"
                label="Technologies"
                hint="Add the technologies used in your application"
                setError={setError}
                handleBlur={(e: FocusEvent<HTMLInputElement>) =>
                  customHandleBlur(e, focusedElements, handleBlur)
                }
                setTechnologies={(e: ValueType<OptionType>) =>
                  handleSelectChange(e, values)
                }
                hasError={hasError(errors, focusedElements, 'technologies')}
              />

              <ButtonWrapper>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() =>
                    (focusedElements =
                      Object.keys(errors).length > 0
                        ? [...Object.keys(errors)]
                        : [...Object.keys(values)])
                  }
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
              </ButtonWrapper>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Wrapper>
  );
};
