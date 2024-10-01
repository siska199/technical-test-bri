import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodArray, ZodBoolean, ZodNumber, ZodObject, ZodString, ZodTypeAny } from 'zod';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const isEmptyValue = (value: any): boolean => {
  if ([undefined, null, '']?.includes(value)) return true;
  if (typeof value === 'object') {
    if (Array.isArray(value)) return value?.length === 0;

    return Object.keys(value).length === 0;
  }

  return false;
};

export const handlePreventDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  return e?.preventDefault();
};

export const handleOnKeyDownPD = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

export const arraysHaveSameMembers = (array1: string[], array2: string[]) => {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  return sortedArray1.every((value, index) => value === sortedArray2[index]);
};

interface TParamsFieldFromObjectList {
  array: any[];
  fieldNameTarget: string;
  fieldNameValue: string;
  value: any;
}
export const getFieldLabelFromOptions = (
  params: Pick<TParamsFieldFromObjectList, 'array' | 'value'>,
) => {
  const { array, value } = params;

  return array?.filter((data) => data?.value === value)?.[0]?.label;
};

interface TParamsSpreadArrayTemp {
  newValue: any;
  array: any[];
}
export const spreadArrayAttemp = (params: TParamsSpreadArrayTemp) => {
  const { newValue, array } = params;

  return isEmptyValue(array) ? [newValue] : [...array, newValue];
};

export function debounce(func?: (...args: any[]) => void, wait?: number) {
  let timeout: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => (func ? func(...args) : null), wait);
  };
}

type DefaultValues = { [key: string]: any };

export const generateDefaultValues = (schema: ZodTypeAny): DefaultValues => {
  const defaultValues: DefaultValues = {};

  if (schema instanceof ZodObject) {
    const shape = schema.shape;

    for (const key in shape) {
      const field = shape[key];
      if (field instanceof ZodString) {
        defaultValues[key] = '';
      } else if (field instanceof ZodNumber) {
        defaultValues[key] = undefined;
      } else if (field instanceof ZodBoolean) {
        defaultValues[key] = false;
      } else if (field instanceof ZodArray) {
        defaultValues[key] = [];
      } else {
        defaultValues[key] = undefined;
      }
    }
  }

  return defaultValues;
};

export function bytesToMegabytes(bytes: number): number {
  return bytes / (1024 * 1024);
}

export const handleGetFileTypeFromName = (name: string) => {
  const type = name?.split('.')?.slice(-1)[0];

  return `.${type?.toLowerCase()}`;
};

interface TParamsDownloadFile {
  url: string;
  filename: string;
}
export const handleDownloadFile = (params: TParamsDownloadFile) => {
  const { url, filename } = params;
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename || 'file';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export type TTypeGeneralFile = 'image' | 'pdf' | undefined;

export const getGeneralTypeFile = (type: string): TTypeGeneralFile => {
  let generalType;
  if (['jpg', 'jpeg', 'png', 'webp']?.some((ext) => type?.toLowerCase()?.includes(ext))) {
    generalType = 'image';
  } else if (type?.includes('pdf')) {
    generalType = 'pdf';
  }

  return generalType as TTypeGeneralFile;
};

export const isValidDomain = (params: { url: string; hostname: string }) => {
  try {
    const { hostname } = new URL(params.url);
    console.log('hostname: ', hostname);
    return params.hostname === hostname;
  } catch (error) {
    return false;
  }
};

export function getFirstContainerInputWithErrorChild() {
  const containerInputs = document.querySelectorAll('.container-input');

  for (let i = 0; i < containerInputs.length; i++) {
    const container = containerInputs[i];
    if (container.querySelector('[data-type="error"]')) {
      return container;
    }
  }

  return null;
}

export const excludeRef = <T extends { ref?: any }>(input: T) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, ...rest } = input;
  return rest;
};
