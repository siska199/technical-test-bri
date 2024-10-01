import { cn } from '@/app/_lib/helper';
import variantBadge from '@/app/_lib/variants/ui/variant-badge';
import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLProps } from 'react';

export interface TPropsBadge
  extends Omit<Partial<HTMLProps<HTMLDivElement>>, 'size' | 'shape' | 'label'>,
    VariantProps<typeof badgeVariants> {
  customeElement?: React.ReactNode;
  label: string | React.ReactNode;
}

const Badge = (props: TPropsBadge) => {
  const { label, className, variant, customeElement, shape, size, ...attrs } = props;

  return (
    <span className={`${cn(badgeVariants({ className, variant, shape, size }))}`} {...attrs}>
      {label}
      {customeElement}
    </span>
  );
};

const badgeVariants = cva(
  'w-fit font-medium bg-white h-fit text-white flex-inline gap-1 text-center font-medium rounded items-center justify-center',
  {
    variants: {
      variant: variantBadge,
      size: {
        small: '!text-[10px] px-2 py-1',
        base: '!text-[12px] px-2 py-1',
        large: '!text-[14px] px-3 py-2',
      },

      shape: {
        pilled: 'rounded-full',
        rounded: 'rounded-md',
        circle: 'rounded-full !aspect-square  flex items-center justify-center',
      },
    },
    compoundVariants: [
      {
        shape: 'circle',
        size: 'base',
        className: 'min-w-[1.5rem] min-h-[1.5rem]',
      },
      {
        shape: 'circle',
        size: 'small',
        className: 'min-w-[1.25rem] min-h-[1.25rem]',
      },
    ],
    defaultVariants: {
      variant: 'soft-primary',
      size: 'base',
      shape: 'pilled',
    },
  },
);

export default Badge;
