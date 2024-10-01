import { useRef } from 'react';

interface TProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatPattern: string;
  value: string;
}

const useFormattedInput = (props: TProps) => {
  const { onChange, formatPattern, value } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const formatValue = (value: string, pattern: string): string => {
    const digitsOnly = String(value).replace(/\D/g, '');
    let formattedValue = '';
    let patternIndex = 0;
    let valueIndex = 0;

    while (valueIndex < digitsOnly.length && patternIndex < pattern.length) {
      if (pattern[patternIndex] === 'X') {
        formattedValue += digitsOnly[valueIndex];
        valueIndex++;
      } else {
        formattedValue += pattern[patternIndex];
      }
      patternIndex++;
    }

    return formattedValue;
  };

  const handleOnChangeFormattedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { selectionStart } = e.target;
    let cursorPosition = selectionStart as number;
    const valueDeleted = value[cursorPosition];
    const valueRaw = e.target.value;

    const formattedValue = formatValue(valueRaw, formatPattern);
    if (inputRef.current) {
      const inputLengthDifference = formattedValue.length - e.target.value.length;
      cursorPosition = (selectionStart as number) + inputLengthDifference;
      if ([',', '-', '.']?.includes(valueDeleted)) {
        cursorPosition -= 1;
      }
    }
    e.target.value = formattedValue;
    onChange(e);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
      }
    }, 0);

    return e;
  };

  return { inputRef, handleOnChangeFormattedValue, formatValue };
};

export default useFormattedInput;
