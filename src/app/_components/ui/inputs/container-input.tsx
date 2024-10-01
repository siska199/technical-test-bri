'use client';
import { IconClose, IconEye, IconEyeClose } from '@/app/_assets/icons';
import Container from '@/app/_components/ui/container';
import HelperMessage from '@/app/_components/ui/helper-message';
import { cn, isEmptyValue } from '@/app/_lib/helper';
import { TBasePropsInput } from '@/types/ui';

import clsx from 'clsx';
import { useState } from 'react';

export interface TPropsInput<TInput> extends TBasePropsInput {
  children: React.ReactNode | ((attrsInput: TInput) => React.ReactNode);
  disabled?: boolean;
  name?: string;
  type?: string;
  onlyContainer?: boolean;
  isClerable?: boolean;
  value?: any;
  onChange?: (e: any) => void;
  childrenOverlay?: React.ReactNode;
  isNotUsingDefaultStyle?: {
    input?: boolean;
  };
  onCustomeClearHandler?: () => void;
  customeClearValue?: string;
  maxLength?: number;
  required?: boolean;
}

const ContainerInput = <TInput,>(props: TPropsInput<TInput>) => {
  const {
    name,
    children,
    onCustomeClearHandler,
    customeClearValue,
    isNotUsingDefaultStyle,
    childrenOverlay,
    label,
    isClerable = true,
    type,
    onlyContainer = false,
    errorMessage,
    customeElement,
    disabled,
    customeClass,
  value,
    onChange,
    maxLength,
    required = true,
    ...attrsInput
  } = props;
  const [dynamicType, setDynamicType] = useState(type);

  const classNameInput = cn({
    'peer w-full shrink !outline-none border-none focus:border-none focus:ring-0 p-0 text-body-base placeholder:text-gray-400':
      !isNotUsingDefaultStyle?.input,
    '!bg-disabled': disabled,
    'px-4': customeElement?.preEnd,
    'pr-4 pl-1': customeElement?.preStart,
    [customeClass?.input || '']: customeClass?.input,
  });

  const handleToggleTypePassword = () => {
    setDynamicType(dynamicType === 'password' ? 'text' : 'password');
  };

  const handleOnClearValue = () => {
    onCustomeClearHandler
      ? onCustomeClearHandler()
      : onChange &&
        onChange({
          target: {
            name: name || '',
            value: Array.isArray(value) ? [] : '',
          },
        });
  };

  return (
    <Container className={`${customeClass?.ciV4} container-input relative flex flex-col gap-2`}>
      <section className={`${customeClass?.ciV3} flex flex-col gap-2 w-full`}>
        <div className="flex gap-2 justify-between">
          <label
            htmlFor={name}
            className={cn({
              'font-semibold w-fit ': true,
            })}
          >
            {label}
            {!required && <span className="font-normal text-gray ml-1">(Optional)</span>}
          </label>
          {maxLength && (
            <span className="text-gray text-body-small">
              {maxLength - Number(value?.length ?? 0)}
            </span>
          )}
        </div>

        {onlyContainer && typeof children !== 'function' ? (
          children
        ) : (
          <div
            className={cn({
              'bg-white flex flex-nowrap items-center gap-2 text-body-base border  rounded-sm  w-full ':
                true,
              [customeClass?.ciV2 || '']: customeClass?.ciV2,
              '!bg-disabled !border': disabled,
              'focus-within:ring-primary-200 focus-within:!border-primary': !errorMessage,
              'border-error focus-within:!ring-error-200 focus-within:!border-error': errorMessage,
              'px-3 py-2 ': !customeElement?.preStart && !customeElement?.preEnd,
              'overflow-hidden': customeElement?.preStart || customeElement?.preEnd,
            })}
          >
            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex bg-gray-100 p-2 ': customeElement?.preStart,
              })}
            >
              {customeElement?.preStart}
            </div>

            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex ': customeElement?.start,
              })}
            >
              {customeElement?.start}
            </div>

            <div className={`${customeClass?.ciV1} flex flex-col w-full relative `}>
              {typeof children === 'function' ? (
                <>
                  {children({
                    ...(attrsInput as TInput),
                    className: classNameInput,
                    name,
                    type: dynamicType,
                    disabled,
                    value,
                    onChange,
                    maxLength,
                  })}
                </>
              ) : (
                children
              )}
            </div>
            {isClerable && !disabled && !isEmptyValue(customeClearValue ?? value) && (
              <IconClose className="cursor-pointer " onClick={handleOnClearValue} />
            )}

            <div
              className={clsx({
                hidden: true,
                'shrink-0 !flex': customeElement?.end,
              })}
            >
              {customeElement?.end}
            </div>
            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex bg-gray-100 p-2 ': customeElement?.preEnd,
              })}
            >
              {customeElement?.preEnd}
            </div>

            {type === 'password' && (
              <div onClick={handleToggleTypePassword} className="cursor-pointer-custome ">
                {dynamicType === 'password' ? <IconEye /> : <IconEyeClose />}
              </div>
            )}
          </div>
        )}
      </section>
      {childrenOverlay}
      <HelperMessage variant={'error'} message={errorMessage} id="error" data-type="error" />
    </Container>
  );
};

export default ContainerInput;
