import ContainerInput from '@/app/_components/ui/inputs/container-input';
import { TBasePropsInput } from '@/types/ui';
import React from 'react';

export interface TPropsInputBase extends TBasePropsInput, React.HTMLProps<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBase = (props: TPropsInputBase) => {
  const { ...attrs } = props;

  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>> {...attrs} isClerable>
      {(attrsInput) => (
        <input {...attrsInput} value={attrsInput?.value || ''} id={attrsInput?.name} />
      )}
    </ContainerInput>
  );
};

InputBase.displayName = 'InputBase';
export default InputBase;
