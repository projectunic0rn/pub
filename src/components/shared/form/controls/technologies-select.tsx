import React, { FC } from 'react';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select/src/types';

import {
  Item,
  ProjectTechnology,
  ServiceResolver,
  Tag,
  UserTechnology,
} from '@api';
import { theme } from '@styles';

type FormValue<T = string> = {
  val: T;
  required: boolean;
};

type FormInputIndexPropType = string | ProjectTechnology[];

type FormInput = {
  pName: FormValue;
  pDesc: FormValue;
  pTech: FormValue<ProjectTechnology[]>;
  pType: FormValue;
  pRepo: FormValue;
  pLaunch: FormValue;
  pComm: FormValue;
  [key: string]: FormValue<FormInputIndexPropType>;
};

type TechnologiesSelectProps = {
  setFormInputs?: Function;
  formInputs?: FormInput;
  formErrors?: string[];
  setFormErrors?: Function;
  setError: Function;
  initialValues?: UserTechnology[];
  setTechnologies: Function;
  name?: string;
  id?: string;
};

type OptionType = {
  label: string;
  value: string;
};

export const TechnologiesSelect: FC<TechnologiesSelectProps> = ({
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
    let technologies: string[];

    if (Array.isArray(e)) {
      technologies = e.map((v) => v.value);
    } else {
      technologies = [];
    }

    setTechnologies(technologies);

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
    defaultValue = initialValues.map(({ name }) => {
      return { type: name, value: name, label: name };
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
