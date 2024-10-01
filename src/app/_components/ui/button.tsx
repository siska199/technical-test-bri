import { cn } from '@/app/_lib/helper';
import { variantButton } from '@/app/_lib/variants/ui/variant-button';
import { cva, VariantProps } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';
import React, { HTMLProps } from 'react';

type TPropsButton = Omit<Partial<HTMLProps<HTMLButtonElement>>, 'label' | 'size' | 'shape'>;

type TPropsLink = LinkProps &
  Partial<HTMLAnchorElement> & {
    disabled?: boolean;
  };

type TProps = (TPropsButton | TPropsLink) &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

const Button = (props: TProps) => {
  const { variant, size, shape, className, isLoading = false, ...attrs } = props;
  const CompButton = attrs?.href ? Link : ('button' as React.ElementType);

  if (attrs.href) {
    attrs.target = '_blank';
  }

  return (
    <CompButton {...attrs} disabled={isLoading || attrs?.disabled} className={cn(buttonVariants({ className, variant, size, shape }))}>
      {isLoading ? <span>Loading...</span> : attrs?.children}
    </CompButton>
  );
};

const buttonVariants = cva('w-fit  gap-1 h-fit items-center  text-white justify-center font-medium flex gap-sm disabled:cursor-not-allowed  disabled:opacity-50 ', {
  variants: {
    variant: {
      ...variantButton,
    },
    shape: {
      rectangle: '',
      rounded: 'rounded-lg',
      circle: 'rounded-full',
    },
    size: {
      small: 'py-1 px-4 ',
      base: 'py-3 px-4 ',
      medium: 'py-3 px-4 text-[16px]',
      large: 'py-4 px-5 text-[18px]',
    },
  },
  defaultVariants: {
    variant: 'solid-primary',
    size: 'base',
    shape: 'rectangle',
  },
});

export default Button;
