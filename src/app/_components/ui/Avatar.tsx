import { ProfessionalImage } from '@/app/_assets/images';
import { cn } from '@/app/_lib/helper';
import variant from '@/app/_lib/variants/variant-color';
import { VariantProps, cva } from 'class-variance-authority';
import { ImageProps, StaticImageData } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface TPropsImage {
  type?: 'image';
  src?: StaticImageData;
}

interface TInitialName {
  type?: 'initial-name';
  name?: string;
}

type TProps = ImageProps &
  VariantProps<typeof avatarVariants> & {
    customeIcon?: React.ReactNode;
  } & (TPropsImage | TInitialName) & {
    customeClass?: {
      icon: string;
    };
    name?: string;
  };

const Avatar = (props: TProps) => {
  const {
    className,
    customeClass,
    type = 'image',
    customeIcon,
    src,
    name,
    variant,
    size,
    shape,
    ...attrsImage
  } = props;
  let updateVariant = variant || 'soft-gray';
  if (!variant && type === 'image') {
    updateVariant = 'solid-black';
  }

  return (
    <div className="relative w-fit">
      <div className={cn(avatarVariants({ className, variant: updateVariant, size, shape }))}>
        {type === 'image' && (
          <Image
            src={src || ProfessionalImage}
            className=" w-full h-full !object-cover"
            {...attrsImage}
            alt={attrsImage?.alt || name || ''}
          />
        )}
        {type === 'initial-name' && <div>{name?.substring(0, 1)}</div>}
      </div>

      {customeIcon && (
        <span
          className={`absolute h-fit w-fit bottom-2 right-2  border p-1 rounded-full bg-gray-200 ${customeClass?.icon}`}
        >
          {customeIcon}
        </span>
      )}
    </div>
  );
};

const avatarVariants = cva(
  'text-white flex !bg-white border-2 !border-gray-200  items-center !aspect-square justify-center w-fit font-semibold overflow-hidden ',
  {
    variants: {
      variant: {
        ...variant,
      },
      size: {
        tiny: 'w-[1.625rem] h-[1.625rem] text-[12px]',
        small: 'w-[2.375rem] ',
        base: 'w-[2.875rem] text-[16px]',
        large: 'w-[11.25rem] text-[20px]',
      },
      shape: {
        rounded: 'rounded-md',
        circular: 'rounded-full',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: 'soft-gray',
      size: 'base',
      shape: 'circular',
    },
  },
);

export default Avatar;
