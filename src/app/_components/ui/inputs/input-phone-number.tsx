'use client';
import ContainerInput from '@/app/_components/ui/inputs/container-input';
import useFormattedInput from '@/app/_hook/useFromattedInput';
import { TBasePropsInput } from '@/types/ui';
import React, { useEffect, useState } from 'react';

export interface TPropsInputPhoneNumber extends TBasePropsInput, React.HTMLProps<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

const InputPhoneNumber = (props: TPropsInputPhoneNumber) => {
  const { onChange: handleOnChange, ...attrs } = props;
  const formatPattern = 'XX-XXX-XXX-XXX';

  const updateValue = String(attrs.value).replace(/^0+/, '') as string;
  const { inputRef, handleOnChangeFormattedValue, formatValue } = useFormattedInput({
    value: updateValue,
    onChange: handleOnChange,
    formatPattern,
  });
  const [formatedValue, setFormatedValue] = useState('');

  useEffect(() => {
    setFormatedValue(formatValue(updateValue, formatPattern));
  }, [attrs?.value]);

  const handleOnChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value[0] === '0') {
      e.preventDefault();
      return;
    }
    handleOnChangeFormattedValue(e);
    setFormatedValue(formatValue(e.target.value, formatPattern));
  };

  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>>
      {...attrs}
      onChange={handleOnChangeUpdate}
      customeElement={{
        ...attrs?.customeElement,
        start: <div>+62</div>,
      }}
    >
      {(attrsInput) => (
        <input
          {...attrsInput}
          value={formatedValue}
          ref={inputRef}
          onChange={handleOnChangeUpdate}
          placeholder={formatPattern}
          maxLength={formatPattern?.length}
        />
      )}
    </ContainerInput>
  );
};

export default InputPhoneNumber;
