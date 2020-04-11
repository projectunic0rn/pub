import React from 'react';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select/src/types';
import { ProjectTechnology } from '@api/types/project-technology';
import { theme } from '@styles';
import { ServiceResolver } from '@api';
import { Tag, Item } from '@api/types/stack-exchange';

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

interface TechnologiesSelectProps {
  setFormInputs?: Function;
  formInputs?: FormInput;
  formErrors?: string[];
  setFormErrors?: Function;
  setError: Function;
  initialValues?: string[];
  setTechnologies: Function;
  name?: string;
  id?: string;
}

interface OptionType {
  label: string;
  value: string;
}

export const TechnologiesSelect: React.FC<TechnologiesSelectProps> = ({
  setFormInputs,
  formInputs,
  formErrors,
  setFormErrors,
  setError,
  initialValues,
  setTechnologies,
  name,
  id,
}) => {
  const styles = {
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
  const stackExchange = ServiceResolver.stackExchangeResolver();

  const handleSelectChange = (e: ValueType<OptionType>) => {
    let technologies: ProjectTechnology[];

    if (Array.isArray(e)) {
      technologies = e.map((v) => ({ name: v.value, projectId: '' }));
      setTechnologies(e.map((v) => v.value));
    } else {
      technologies = [];
    }

    if (formInputs && setFormInputs) {
      setFormInputs({
        ...formInputs,
        pTech: { ...formInputs.pTech, val: technologies },
      });
    }
  };

  const handleAsyncSelectOnBlur = () => {
    if (formErrors && formInputs && setFormErrors) {
      const formErrorState: string[] = formErrors;

      if (formErrorState) {
        if (
          formErrorState.indexOf('pTech') > 0 ||
          formInputs.pTech.val.length
        ) {
          if (formInputs.pTech.val.length) {
            formErrorState.splice(formErrorState.indexOf('pTech'), 1);
          }
        } else {
          if (!formInputs.pTech.val.length) {
            formErrorState.push('pTech');
          }
        }

        setFormErrors([...formErrorState]);
      }
    }
  };

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

  let defaultValue: OptionType[] = [];

  if (initialValues)
    defaultValue = initialValues.map((v) => {
      return { type: v, value: v, label: v };
    });

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isMulti
      onChange={handleSelectChange}
      styles={styles}
      onBlur={handleAsyncSelectOnBlur}
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      name={name}
      id={id}
    />
  );
};
