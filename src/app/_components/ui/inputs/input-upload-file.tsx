'use client';
import { IconCamera } from '@/app/_assets/icons';
import { PlaceholderImage } from '@/app/_assets/images';
import Avatar from '@/app/_components/ui/Avatar';
import Button from '@/app/_components/ui/button';
import ContainerInput from '@/app/_components/ui/inputs/container-input';
import PDFThumbnail from '@/app/_components/ui/pdf-thumbnail';
import {
  bytesToMegabytes,
  getGeneralTypeFile,
  handleDownloadFile,
  handleGetFileTypeFromName,
} from '@/app/_lib/helper';
import { TBasePropsInput, TCustomeEventOnChange } from '@/types/ui';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export enum TTypeFile {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
  GIF = '.gif',
  BMP = '.bmp',
  WEBP = '.webp',

  DOC = '.doc',
  DOCX = '.docx',
  PDF = '.pdf',
  TXT = '.txt',
  XLS = '.xls',
  XLSX = '.xlsx',
  CSV = '.csv',

  ALL = '*',
  IMAGE_ALL = 'image/*',
}
type TFileWithPreview = File & { preview?: string };
export type TFileValue = TFileWithPreview | null;
export interface TPropsInputUploadFile
  extends Omit<TBasePropsInput, 'variant'>,
    Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'value' | 'onChange'> {
  name: string;
  totalMaxSize?: number;
  listAcceptedFile?: TTypeFile[] | [];
  onChange: (e: TCustomeEventOnChange<TFileValue>) => void;
  value: TFileValue;
  variant?: 'change-profile' | 'general';
}

const InputUploadFile = (props: TPropsInputUploadFile) => {
  const {
    listAcceptedFile = [TTypeFile.ALL],
    totalMaxSize = 5,
    onChange,
    name,
    variant = 'general',
    errorMessage,
    ...attrsInput
  } = props;
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [acceptedFile, setAcceptedFile] = useState('');
  const [errorMessageDynamic, setErrorMessageDynamic] = useState('');

  useEffect(() => {
    setErrorMessageDynamic(errorMessage || '');
  }, [errorMessage]);
  useEffect(() => {
    setAcceptedFile(variant === 'change-profile' ? 'image/*' : listAcceptedFile?.join(', '));
  }, [listAcceptedFile]);

  const handleOnClickInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();
    inputFileRef?.current?.click();
  };

  const handleUpdateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as TFileWithPreview;
    const isValidFile = handleValidationInputFile(file);
    file.preview = URL.createObjectURL(file);

    onChange({
      target: {
        name,
        value: isValidFile ? file : null,
      },
    });
    isValidFile && setErrorMessageDynamic('');
  };

  const handleValidationInputFile = (file: File): boolean => {
    const isValid = true;
    const totalSize: number = bytesToMegabytes(file?.size);

    if (totalSize > totalMaxSize) {
      setErrorMessageDynamic('File upload cancelled due to size limit exceeded.');
      return false;
    }
    const type = handleGetFileTypeFromName(file?.name) as TTypeFile;
    const isAllowAllImage = listAcceptedFile?.includes(TTypeFile.IMAGE_ALL);
    const isAllFileTypesAllowed =
      listAcceptedFile?.includes(type) || (isAllowAllImage && file?.type?.includes('image'));

    if (!isAllFileTypesAllowed) {
      setErrorMessageDynamic(`Please upload the correct type file : ${acceptedFile}`);
      return false;
    }

    return isValid;
  };

  const handleOnDownloadFile = () => {
    attrsInput?.value &&
      handleDownloadFile({
        url: (attrsInput?.value as TFileWithPreview)?.preview as string,
        filename: attrsInput?.value?.name as string,
      });
  };
  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>>
      {...attrsInput}
      customeClass={{
        ...attrsInput.customeClass,
        ciV2: '!border-none !p-0',
      }}
      errorMessage={errorMessageDynamic}
      isClerable={false}
    >
      {variant === 'change-profile' && (
        <Avatar
          size={'large'}
          alt={attrsInput.value?.name || ''}
          src={(attrsInput?.value as TFileWithPreview)?.preview || ''}
          customeClass={{ icon: 'cursor-pointer-custome !border-1 !bg-white' }}
          customeIcon={<IconCamera className="icon-primary-fill" onClick={handleOnClickInput} />}
        />
      )}

      {variant === 'general' && (
        <div className="flex gap-4 ">
          {attrsInput.value ? (
            <Thumbnail file={attrsInput.value} />
          ) : (
            <Image
              className={`self-center !h-[7rem] !w-[7rem] border ${errorMessageDynamic && '!border-error'}`}
              width={500}
              height={500}
              src={PlaceholderImage}
              alt="Initial Image"
            />
          )}

          <div className="space-y-3 my-auto">
            <p className="font-italic">
              Please upload a file (Max size: {totalMaxSize}MB, Formats:{' '}
              {listAcceptedFile?.join(', ')})
            </p>
            <div className="flex gap-2">
              <Button variant={'outline-primary'} onClick={handleOnClickInput}>
                Choose File
              </Button>
              <span
                className={`my-auto text-gray ${attrsInput?.value && 'cursor-pointer hover:underline'}`}
                onClick={handleOnDownloadFile}
              >
                {attrsInput?.value?.name ?? 'No File Choosen'}
              </span>
            </div>
          </div>
        </div>
      )}

      <input
        {...attrsInput}
        ref={inputFileRef}
        className="hidden"
        type="file"
        accept={acceptedFile}
        value={''}
        multiple={false}
        onChange={(e) => handleUpdateOnChange(e)}
      />
    </ContainerInput>
  );
};

interface TPropsThumbnail {
  file: File;
}

const Thumbnail = (props: TPropsThumbnail) => {
  const { file } = props;
  return (
    <>
      {getGeneralTypeFile(file?.type) === 'image' && (
        <Image
          className="self-center  !h-[7rem] !w-[7rem] border "
          width={500}
          height={500}
          src={(file as TFileWithPreview)?.preview || ''}
          alt="Preview Image"
        />
      )}
      {getGeneralTypeFile(file?.type) === 'pdf' && (
        <PDFThumbnail
          customeClass={{
            container: '!h-[7rem] !w-[7rem] !max-h-[7rem] !max-w-[7rem] !min-w-[7rem]',
          }}
          file={file}
        />
      )}
    </>
  );
};

export default InputUploadFile;
