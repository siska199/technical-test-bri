
import Container from '@/app/_components/ui/container';
import ContainerInput from '@/app/_components/ui/inputs/container-input';
import InputCheckbox from '@/app/_components/ui/inputs/input-checkbox';
import { arraysHaveSameMembers, cn, handlePreventDefault } from '@/app/_lib/helper';
import { TBasePropsInput, TCustomeEventOnChange } from '@/types/ui';
import { useEffect, useState } from 'react';

interface TProps extends TBasePropsInput, Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  name: string;
  onChange: (e: TCustomeEventOnChange<string[]>) => void;
  options: {
    label: string;
    value: any;
  }[];
  value: any[];
  customeClassMulCheckbox?: {
    containerOption?: string;
    containerCheckbox?: string;
  };
  withSelectAll?: boolean;
  activeIndex?: number;
}

const InputMultipleCheckbox = (props: TProps) => {
  const { name, onChange, options, value, customeClassMulCheckbox, withSelectAll, onScroll: handleOnScroll, errorMessage, ...attrsInput } = props;
  const [isCheckAll, setIsCheckAll] = useState(false);

  useEffect(() => {
    if (withSelectAll) {
      setIsCheckAll(
        arraysHaveSameMembers(
          value,
          options?.map((data) => data.value),
        ),
      );
    }
  }, [value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const valueInput = e.target?.value;

    let updateValue = isChecked ? [...value, valueInput] : value?.filter((data) => data !== valueInput);
    if (valueInput === 'all') {
      updateValue = isChecked ? options?.map((data) => data?.value) : [];
    }

    onChange({
      target: {
        name,
        value: updateValue,
      },
    });
  };

  const Checkbox = (props: any) => {
    return (
      <Container
        className={cn({
          [customeClassMulCheckbox?.containerCheckbox || '']: customeClassMulCheckbox?.containerCheckbox,
        })}
        onMouseDown={handlePreventDefault}
        variant={'hsc'}
        gap={'base'}
      >
        <InputCheckbox label={props?.option?.label} type="checkbox" name={name} checked={props?.isChecked} value={props?.option?.value} onChange={handleOnChange} />
      </Container>
    );
  };

  return (
    <ContainerInput {...attrsInput} errorMessage={errorMessage} onlyContainer={true}>
      <Container className={`${customeClassMulCheckbox?.containerOption}`} onScroll={handleOnScroll}>
        {withSelectAll && <Checkbox isChecked={isCheckAll} option={{ label: 'Select All', value: 'all' }} />}
        {options?.map((option, i) => {
          const isChecked = value?.some((data) => data === option?.value);

          return <Checkbox key={i} index={i} isChecked={isChecked} option={option} />;
        })}
      </Container>
    </ContainerInput>
  );
};

export default InputMultipleCheckbox;
