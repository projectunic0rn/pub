import React, { FC, useState } from 'react';
import { TechnologiesSelect } from '../../shared/form/controls';
import { ProjectTechnology } from '@api';
import { Button } from '../../shared/buttons';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 100%;
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    width: 400px;
  }
`;

interface OptionType {
  label: string;
  value: string;
}

interface FormInput {
  pTech: FormValue<ProjectTechnology[]>;
}

interface FormValue<T = string> {
  val: T;
  required: boolean;
}

type ProjectFilterProps = {
  filter: Function;
};

const ProjectFilter: FC<ProjectFilterProps> = ({ filter }) => {
  const [error, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<[]>();
  const [formInputs, setFormInputs] = useState<FormInput>({
    pTech: { val: [], required: true },
  });

  const handleSelectChange = (e: []) => {
    const technologies: ProjectTechnology[] = Array.isArray(e)
      ? e.map((v) => ({ name: v, projectId: '' }))
      : [];

    setFormInputs({
      ...formInputs,
      pTech: { ...formInputs.pTech, val: technologies },
    });

    setLanguages(e);
  };

  const handleOnClick = () => {
    filter(languages);
  };

  return (
    <Wrapper
      style={{ display: 'flex', justifyContent: 'end', marginBottom: '1rem' }}
    >
      <TechnologiesSelect
        setError={() => null}
        setTechnologies={handleSelectChange}
      />
      <Button onClick={() => handleOnClick()}>Filter</Button>
    </Wrapper>
  );
};

export default ProjectFilter;
