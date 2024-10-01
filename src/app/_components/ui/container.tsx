import { cn } from '@/app/_lib/helper';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

interface TProps extends React.HTMLProps<HTMLDivElement>, VariantProps<typeof containerFlexVariants> {
  children: React.ReactNode;
  customElement?: 'ul' | 'nav' | 'body' | 'main' | 'form';
}

const Container: React.FC<TProps> = (props) => {
  const { children, className, variant, gap, fit, padding, typeComp, customElement, ...attrs } = props;
  const Component = customElement ?? ('div' as React.ElementType);

  return (
    <Component className={cn(containerFlexVariants({ className, variant, gap, fit, padding, typeComp }))} {...attrs}>
      {children}
    </Component>
  );
};

const containerFlexVariants = cva('flex w-full flex-wrap md:flex-nowrap ', {
  variants: {
    variant: {
      hcs: 'flex justify-center items-start',
      hcc: 'flex justify-center items-center',
      hce: 'flex justify-center items-end',
      hss: 'flex justify-start items-start',
      hsc: 'flex justify-start items-center',
      hse: 'flex justify-start items-end',
      hes: 'flex justify-start items-start',
      hec: 'flex justify-start items-center',
      hee: 'flex justify-start items-end',
      hbs: 'flex justify-between items-start',
      hbc: 'flex justify-between items-center',
      hbe: 'flex justify-between items-end',
      vcs: 'flex-col items-center justify-start',
      vcc: 'flex-col items-center justify-center',
      vce: 'flex-col items-center justify-end',
      vss: 'flex-col items-start justify-start',
      vsc: 'flex-col items-start justify-center',
      vse: 'flex-col items-start justify-end',
      ves: 'flex-col items-end justify-start',
      vec: 'flex-col items-end justify-center',
      vee: 'flex-col items-end justify-end',
    },
    fit: {
      true: 'w-fit',
      false: 'w-full',
    },
    gap: {
      tiny: 'gap-1',
      small: 'gap-2',
      base: 'gap-4',
      medium: 'gap-6',
      large: 'gap-8',
      xl: 'gap-16',
    },

    padding: {
      small: 'p-2 w-[calc(100%-0.50rem)]',
      base: 'p-4 w-[calc(100%-1rem)]',
      medium: 'p-6 w-[calc(100%-1.5rem)]',
      large: 'p-8 w-[calc(100%-2rem)]',
      xl: 'p-16 w-[calc(100%-4rem)]',
    },
    typeComp: {
      page: 'min-h-screen h-screen',
      card: 'p-4',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'vss',
    fit: false,
  },
});

export default Container;
