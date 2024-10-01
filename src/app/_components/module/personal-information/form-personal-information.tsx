'use client';
import { IconGithub, IconLinkind, IconWebsite } from '@/app/_assets/icons';
import Button from '@/app/_components/ui/button';
import InputBase, { TPropsInputBase } from '@/app/_components/ui/inputs/input-base';
import InputPhoneNumber, {
  TPropsInputPhoneNumber,
} from '@/app/_components/ui/inputs/input-phone-number';
import InputSelect, { TPropsInputSelect } from '@/app/_components/ui/inputs/input-select';
import InputTextArea, { TPropsTextArea } from '@/app/_components/ui/inputs/input-text-area';
import InputTextEditor, {
  TPropsInputTextEditor,
} from '@/app/_components/ui/inputs/input-text-editor';
import InputUploadFile, {
  TFileValue,
  TPropsInputUploadFile,
  TTypeFile,
} from '@/app/_components/ui/inputs/input-upload-file';
import { cities, districts, postalCodes, provinces } from '@/app/_lib/data/dummy';
import {
  excludeRef,
  generateDefaultValues,
  getFirstContainerInputWithErrorChild,
  handleOnKeyDownPD,
} from '@/app/_lib/helper';
import {
  personalInformationSchema,
  TFormPersonalInformation,
} from '@/schemas/personal-information-schema';
import { TCustomeEventOnChange } from '@/types/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type TInitialForm<Form> = Required<{
  [K in keyof Form]: {
    Component?: any;
    attributes: { [key: string]: any };
  };
}>;

const FormPersonalInformation = () => {
  const [initialForm] = useState<TInitialForm<TFormPersonalInformation>>({
    firstName: {
      Component: InputBase,
      attributes: {
        label: 'First Name',
        placeholder: 'e.g Siska Apriana',
      } as TPropsInputBase,
    },
    lastName: {
      Component: InputBase,
      attributes: {
        label: 'Last Name',
        placeholder: 'e.g Rifianti',
      } as TPropsInputBase,
    },
    profession: {
      attributes: {
        label: 'Profession',
        placeholder: 'e.g Frontend Developer',
      } as TPropsInputBase,
    },
    province: {
      Component: InputSelect,
      attributes: {
        label: 'Province',
        placeholder: 'e.g Jawa Timur',
        options: provinces,
      } as TPropsInputSelect,
    },
    city: {
      Component: InputSelect,
      attributes: {
        label: 'City',
        placeholder: 'e.g Situbondo',
        options: cities,
        disabled: true,
      } as TPropsInputSelect,
    },
    district: {
      Component: InputSelect,
      attributes: {
        label: 'District',
        placeholder: 'e.g Besuki',
        options: districts,
        disabled: true,
      } as TPropsInputSelect,
    },
    postalCode: {
      Component: InputBase,
      attributes: {
        label: 'Postal Code',
        placeholder: 'e.g 68356',
        type: 'number',
        maxLength: 5,
        disabled: true,
      } as TPropsInputBase,
    },
    phone: {
      Component: InputPhoneNumber,
      attributes: {
        label: 'Phone',
      } as TPropsInputPhoneNumber,
    },
    email: {
      Component: InputBase,
      attributes: {
        label: 'Email',
        placeholder: 'e.g siska@gmail.com',
      } as TPropsInputBase,
    },
    bio: {
      Component: InputTextArea,
      attributes: {
        label: 'Bio',
        placeholder: `e.g I'm Frontend Developer based on Jakarta, Indonesia`,
        maxLength: 100,
      } as TPropsTextArea,
    },
    aboutMe: {
      Component: InputTextEditor,
      attributes: {
        label: 'About Me',
        placeholder: 'Write a brief summary about your professional background and skills',
      } as TPropsInputTextEditor,
    },
    image: {
      Component: InputUploadFile,
      attributes: {
        label: 'Profesional Image',
        listAcceptedFile: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
      } as Omit<TPropsInputUploadFile, 'name' | 'onChange' | 'value'>,
    },
    linkind: {
      Component: InputBase,
      attributes: {
        label: 'Linkind',
        placeholder: 'e.g https://www.linkedin.com/in/siska-apriana-rifianti/',
        customeElement: {
          start: <IconLinkind className="w-6 h-6" />,
        },
        required: false,
      } as TPropsInputBase,
    },
    gitRepository: {
      Component: InputBase,
      attributes: {
        label: 'Git Repository',
        placeholder: 'e.g https://github.com/siska199/',
        customeElement: {
          start: <IconGithub className="w-5 h-5" />,
        },
        required: false,
      } as TPropsInputBase,
    },
    website: {
      Component: InputBase,
      attributes: {
        label: 'Website',
        placeholder: 'e.g https://portofolio-siska199.vercel.app/',
        customeElement: {
          start: <IconWebsite className="w-5 h-5" />,
        },
        required: false,
      } as TPropsInputBase,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm<TFormPersonalInformation>({
    resolver: zodResolver(personalInformationSchema, {}, { raw: true }),
    defaultValues: generateDefaultValues(personalInformationSchema) as TFormPersonalInformation,
  });

  const handleOnChange = (e: TCustomeEventOnChange<string | string[] | TFileValue>) => {
    const name = e.target.name as keyof TFormPersonalInformation;
    const value = e.target.value as string;

    if (name == 'province') {
      const isDisabled = !value;
      initialForm['city'].attributes.disabled = isDisabled;
      initialForm['district'].attributes.disabled = isDisabled;

      resetField('city');
      resetField('district');
      resetField('postalCode');
    }
    if (name === 'city') {
      const isDisabled = !value;
      initialForm['district'].attributes.disabled = isDisabled;
      resetField('district');
      resetField('postalCode');
    }

    if (name === 'district') {
      const helperValue = districts.filter((data) => data.value === value)[0]?.helperValue;
      const postalCode = postalCodes?.filter((data) => data.helperValue === helperValue)?.[0]
        ?.value;
      setValue('postalCode', Number(postalCode));
    }
    setValue(name, value);
  };

  const handleOnSubmit: SubmitHandler<TFormPersonalInformation> = async (data) => {
    try {
      console.log('data: ', data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    const pageElmn = getFirstContainerInputWithErrorChild();
    setTimeout(() => {
      pageElmn?.scrollIntoView();
    }, 10);
  }, [errors]);

  return (
    <form
      onKeyDown={handleOnKeyDownPD}
      className="space-y-6"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className={'grid grid-cols-2 gap-6'}>
        {['firstName', 'lastName']?.map((data, i) => {
          const name = data as keyof typeof initialForm;
          const InputComponent = initialForm[name].Component;
          return (
            <InputComponent
              key={i}
              {...excludeRef(register(name))}
              value={watch(name)}
              {...initialForm[name].attributes}
              onChange={handleOnChange}
              errorMessage={errors?.[name]?.message}
            />
          );
        })}
      </div>
      <InputBase
        {...initialForm['profession'].attributes}
        {...excludeRef(register('profession'))}
        value={watch('profession')}
        onChange={handleOnChange}
        errorMessage={errors?.profession?.message}
      />
      <div className={'grid grid-cols-2 gap-6'}>
        {['province', 'city', 'district', 'postalCode', 'phone', 'email']?.map((data, i) => {
          const name = data as keyof typeof initialForm;
          const InputComponent = initialForm[name].Component;
          return (
            <InputComponent
              key={i}
              {...excludeRef(register(name))}
              value={watch(name)}
              {...initialForm[name].attributes}
              onChange={handleOnChange}
              errorMessage={errors?.[name]?.message}
            />
          );
        })}
      </div>
      {['bio', 'aboutMe', 'image', 'linkind', 'gitRepository', 'website']?.map((data, i) => {
        const name = data as keyof typeof initialForm;
        const InputComponent = initialForm[name]?.Component;
        return (
          <InputComponent
            key={i}
            {...excludeRef(register(name))}
            value={watch(name)}
            {...initialForm[name].attributes}
            onChange={handleOnChange}
            errorMessage={errors?.[name]?.message}
          />
        );
      })}

      <Button className="ml-auto" type="submit">
        Save
      </Button>
    </form>
  );
};

export default FormPersonalInformation;
