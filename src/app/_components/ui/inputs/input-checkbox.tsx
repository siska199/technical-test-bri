'use client';
import { IconCheck } from '@/app/_assets/icons';
import Container from '@/app/_components/ui/container';
import { TBasePropsInput } from '@/types/ui';
import React, { useMemo } from 'react';

interface TProps extends Omit<TBasePropsInput, 'errorMessage'>, Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
  classNameContainer?: string;
  customeClassnameCheckbox?: {
    container?: string;
  };
}

const InputCheckbox = (props: TProps) => {
  const { name, onChange, value, customeClassnameCheckbox, label = '', checked, ...attrsInput } = props;

  const updatedChecked = useMemo(() => {
    return ['true', 'false']?.includes(String(value)) ? String(value) === 'true' : checked;
  }, [checked, value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const updatedValue = ['true', 'false']?.includes(String(value)) ? String(isChecked) : value;

    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: updatedValue as string,
      },
    });
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.preventDefault();

  return (
    <Container onMouseDown={handleOnMouseDown} variant={'hsc'} gap={'base'} className={`${!label && '!w-fit'} ${customeClassnameCheckbox?.container} `}>
      <label className="  relative flex items-center py-1 rounded-full cursor-pointer" htmlFor="radio">
        <input
          {...attrsInput}
          type="checkbox"
          name={name}
          checked={updatedChecked}
          value={String(value)}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500  before:opacity-0 before:transition-opacity  disabled:border-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed checked:border-primary checked:bg-primary checked:before:bg-primary disabled:before:!bg-none disabled:before:opacity-0 hover:before:opacity-10"
          onChange={handleOnChange}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <IconCheck className="icon-white" />
        </span>
      </label>
      {label && (
        <label className="mt-px cursor-pointer select-none" htmlFor="radio">
          {label}
        </label>
      )}
    </Container>
  );
};

InputCheckbox.displayName = 'InputCheckbox';

export default InputCheckbox;
