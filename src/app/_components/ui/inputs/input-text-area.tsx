import ContainerInput from '@/app/_components/ui/inputs/container-input';
import { TBasePropsInput } from '@/types/ui';
import React from 'react';

export interface TPropsTextArea extends TBasePropsInput, React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputTextArea = (props: TPropsTextArea) => {
  const { ...attrs } = props;

  return (
    <ContainerInput<React.HTMLProps<HTMLTextAreaElement>>
      customeClass={{
        ...attrs?.customeClass,
        ciV2: `${attrs?.customeClass?.ciV2} `,
      }}
      {...attrs}
    >
      {(attrsInput) => <textarea {...attrsInput}  />}
    </ContainerInput>
  );
};

export default InputTextArea;
