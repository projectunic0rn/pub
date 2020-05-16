import React, { FC, FocusEventHandler } from 'react';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select/src/types';

import { FormInputWrapper } from './form-input-wrapper';
import { Item, ServiceResolver, Tag, UserTechnology } from '@api';
import { theme } from '@styles';

type TechnologiesSelectProps = {
  setError: Function;
  initialValues?: UserTechnology[];
  setTechnologies: Function;
  name: string;
  id?: string;
  hint?: string;
  label?: string;
  handleBlur?: FocusEventHandler;
  hasError: boolean;
};

type OptionType = {
  label: string;
  value: string;
};

export const TechnologiesSelect: FC<TechnologiesSelectProps> = ({
  setError,
  initialValues,
  setTechnologies,
  name,
  id,
  label,
  hint,
  handleBlur,
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
    <FormInputWrapper name={name} hint={hint} label={label}>
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti
        onChange={handleSelectChange}
        styles={styles}
        onBlur={handleBlur}
        loadOptions={promiseOptions}
        defaultValue={defaultValue}
        name={name}
        id={id || name}
      />
    </FormInputWrapper>
  );
};
