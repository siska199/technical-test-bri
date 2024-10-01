'use client';

import { IconChevronToggle, IconClose } from '@/app/_assets/icons';
import Badge from '@/app/_components/ui/Badge';
import ContainerInput from '@/app/_components/ui/inputs/container-input';
import InputMultipleCheckbox from '@/app/_components/ui/inputs/input-multiple-checkbox';
import useOnClickOutside from '@/app/_hook/useOnClickOutside';
import { debounce, getFieldLabelFromOptions, spreadArrayAttemp } from '@/app/_lib/helper';
import { TBasePropsInput, TCustomeEventOnChange, TOption } from '@/types/ui';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export type TPropsInputSelect = {
  name: string;
  onChange: (e: TCustomeEventOnChange<string | string[]>) => void;
  options: TOption[];
  onLoadMore?: (args?: any[]) => void;
} & (SingleSelectProps | MultipleSelectProps);

interface SingleSelectProps
  extends TBasePropsInput,
    Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  isMultiple?: false;
  value: string;
  withSelectAll?: false;
}

interface MultipleSelectProps
  extends TBasePropsInput,
    Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  isMultiple: true;
  value: string[];
  withSelectAll?: boolean;
}

const InputSelect = (props: TPropsInputSelect) => {
  const { options, isMultiple, withSelectAll, onLoadMore, ...attrs } = props;

  const refContainerDropdown = useRef<HTMLDivElement | null>(null);
  const refContainerValue = useRef<HTMLDivElement | null>(null);
  const refIconChevron = useRef<HTMLDivElement | null>(null);
  const refInput = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useOnClickOutside<HTMLDivElement>({
    ref: refContainerDropdown,
    refExceptions: [refIconChevron, refInput, refContainerValue],
    handler: () => {
      setIsOpen(false);
      if (filteredOptions?.length == 0) {
        setSearchQuery('');
      }
    },
  });

  useEffect(() => {
    if (!isMultiple) {
      const labelOfValue = getFieldLabelFromOptions({ array: options, value: attrs?.value });
      setSearchQuery(labelOfValue || '');
    }
  }, [attrs.value]);

  useEffect(() => {
    if (refInput?.current && isMultiple) {
      refInput.current.style.width = `${searchQuery?.length * 10 || 10}px`;
    }
  }, [searchQuery, isMultiple]);

  useEffect(() => {
    if (searchQuery && onLoadMore) {
      debouncedLoadMoreOptions();
    }
  }, [searchQuery]);

  useEffect(() => {
    const element = optionRefs.current?.[activeIndex - 1];
    if (element) {
      element?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handleOnClickOption = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TOption,
  ) => {
    e?.stopPropagation();
    let valueUpdates: string[] | string = data?.value;

    if (isMultiple && Array.isArray(attrs?.value)) {
      const isSelected = attrs?.value?.some((singleValue) => singleValue === data?.value);
      valueUpdates = isSelected
        ? attrs?.value?.filter((data) => data !== valueUpdates)
        : (spreadArrayAttemp({ newValue: valueUpdates, array: attrs?.value }) as string[]);
      setSearchQuery('');
    } else {
      setIsOpen(false);
    }
    attrs?.onChange({
      target: {
        name: attrs?.name,
        value: valueUpdates,
      },
    });
    setIsSearch(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.stopPropagation();
    setIsSearch(true);
    setSearchQuery(e.target.value);
  };

  const handleOnClearValue = () => {
    if (isMultiple) {
      setSearchQuery('');
    } else {
      attrs?.onChange({
        target: {
          name: attrs?.name,
          value: '',
        },
      });
      setSearchQuery('');
    }
  };

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && onLoadMore) {
      onLoadMore();
    }
  };

  const handleOnClcikChevron = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!attrs?.disabled) {
      const updateIsOpen = !isOpen;
      if (updateIsOpen) refInput?.current?.focus();
      setIsOpen(updateIsOpen);
    }
  };

  const handleOnClickContainerValue = () => {
    !isOpen && isMultiple && refInput?.current?.focus();
    setIsOpen(isMultiple ? !isOpen : true);
  };

  const handleOnChangeMultipleCheckbox = (e: TCustomeEventOnChange<string[]>) => {
    attrs?.onChange(e);
    setSearchQuery('');
  };

  const debouncedLoadMoreOptions = useRef(debounce(onLoadMore, 1000)).current;
  const filteredOptions = useMemo(
    () =>
      options?.filter((option) =>
        String(option?.label)?.toLowerCase().includes(searchQuery?.toLowerCase()),
      ),
    [searchQuery, options],
  );

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let currentActiveIndex = activeIndex;
    console.log(activeIndex);
    if (e.key === 'ArrowDown') {
      currentActiveIndex = activeIndex === filteredOptions?.length ? activeIndex : activeIndex + 1;
    }
    if (e.key === 'ArrowUp') {
      currentActiveIndex = activeIndex === 1 ? activeIndex : activeIndex - 1;
    }
    setActiveIndex(currentActiveIndex);
  };

  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>>
      {...attrs}
      isClerable
      onCustomeClearHandler={handleOnClearValue}
      customeClearValue={isMultiple ? searchQuery : String(attrs?.value) || searchQuery}
      customeElement={{
        ...attrs?.customeElement,
        end: (
          <span ref={refIconChevron} onClick={handleOnClcikChevron}>
            <IconChevronToggle className={`${attrs.disabled && '!cursor-auto'}`} isOpen={isOpen} />
          </span>
        ),
      }}
      customeClass={{
        ...attrs?.customeClass,
        ciV1: '',
        ciV3: 'mb-2',
        ciV2: ' flex-no-wrap max-w-full',
        input: 'min-w-0',
        ciV4: '!inline-block ',
      }}
      childrenOverlay={
        <div
          ref={refContainerDropdown}
          className={clsx({
            'absolute   z-10 mt-0 origin-bottom-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none':
              true,
            ' h-auto shadow-lg w-full': isOpen,
            ' h-0 shadow-none': !isOpen,
          })}
        >
          {isOpen &&
            (isMultiple ? (
              <InputMultipleCheckbox
                options={filteredOptions}
                {...attrs}
                value={attrs.value as string[]}
                onScroll={handleOnScroll}
                customeClassMulCheckbox={{
                  containerOption: '!px-0 !py-1 !max-h-[10rem] !flex-nowrap !overflow-y-scroll',
                  containerCheckbox: '!px-4 !py-1',
                }}
                label={''}
                onChange={handleOnChangeMultipleCheckbox}
                withSelectAll={withSelectAll || false}
              />
            ) : (
              <div onScroll={handleOnScroll} className="py-0 overflow-y-auto max-h-[10rem]">
                {filteredOptions?.map((option, i) => {
                  const isSelected = option?.value === attrs?.value;

                  return (
                    <div
                      key={i}
                      ref={(el) => {
                        optionRefs.current[i] = el;
                      }}
                      // eslint-disable-next-line react/jsx-handler-names
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        handleOnClickOption(e, option)
                      }
                      className={clsx({
                        'hover:bg-gray-100 block px-4 py-2 cursor-pointer ': true,
                        '!bg-primary-50 text-primary-700 ': isSelected,
                        '!bg-gray-100':
                          (isSearch && i === 0 && searchQuery) || activeIndex - 1 == i,
                      })}
                    >
                      {option?.label}
                    </div>
                  );
                })}
                {filteredOptions?.length == 0 && (
                  <div className="p-3 !bg-bray-100 font-medium text-gray">No Option</div>
                )}
              </div>
            ))}
        </div>
      }
    >
      {(attrsInput) => (
        <div
          ref={refContainerValue}
          className={clsx({
            'flex shrink gap-2 flex-wrap  overflow-x-auto  scrollbar-hidden': true,
          })}
          onClick={handleOnClickContainerValue}
        >
          <div className=" w-full cursor-pointer flex flex-wrap gap-1 h-full ">
            {isMultiple &&
              (attrs?.value as string[])?.map((data, i: number) => {
                const labelValue = getFieldLabelFromOptions({ array: options, value: data });

                return (
                  <Badge
                    key={i}
                    label={
                      <div className="flex gap-1 items-center">
                        {labelValue}
                        <div
                          onClick={(e) =>
                            handleOnClickOption(e, { label: labelValue, value: data })
                          }
                        >
                          <IconClose className="icon-primary icon-primary-fill" />
                        </div>
                      </div>
                    }
                  />
                );
              })}
            <input
              {...attrsInput}
              // eslint-disable-next-line react/jsx-handler-names
              onKeyDown={handleOnKeyDown}
              id={attrsInput?.name}
              onChange={handleSearchChange}
              value={String(searchQuery) || ''}
              ref={refInput}
              autoComplete={'new-password'}
            />
          </div>
        </div>
      )}
    </ContainerInput>
  );
};

InputSelect.displayName = 'InputSelect';

export default InputSelect;
